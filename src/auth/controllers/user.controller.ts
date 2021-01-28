import { Controller, Get, Post, Body } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user/user.dto';
import { UserDataMapper } from '../dataMapper/user/user.dataMapper';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    const user: User = UserDataMapper.toEntity(userDto);
    return this.userService.create(user);
  }
}
