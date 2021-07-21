import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolvers';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [CommonModule],
})
export class UsersModule {}
