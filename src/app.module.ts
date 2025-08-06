import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DetailsModule } from './details/details.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, DetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
