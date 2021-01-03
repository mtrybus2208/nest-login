import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
