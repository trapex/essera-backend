import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const { id, email } = (req as any).user as {id: string; email?: string};
    const profile = await this.usersService.getProfile(id);

    return {
      id: id ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      email: profile?.email ?? email ?? '',
    };
  }
}
