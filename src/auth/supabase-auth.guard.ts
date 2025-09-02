import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private jwksPromise: Promise<ReturnType<any>>;

  constructor() {
    // лениво создаём промис с JWKS, чтобы не дергать каждый раз
    this.jwksPromise = (async () => {
      const { createRemoteJWKSet } = await import('jose');
      return createRemoteJWKSet(
        new URL(`${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`)
      );
    })();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'];

    if (!auth || typeof auth !== 'string' || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('No bearer token');
    }

    const token = auth.slice(7);

    try {
      const { jwtVerify } = await import('jose');
      const jwks = await this.jwksPromise;

      const { payload } = await jwtVerify(token, jwks);
      (req as any).user = {
        id: payload.sub as string,
        email: (payload as any).email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
