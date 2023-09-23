import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { SignupUserDto } from './dto/signupUser.dto';
import { SigninUserDto } from './dto/signinUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.usersService.signup(signupUserDto);
  }

  @Post('signin')
  async signin(@Body() signinDTO: SigninUserDto) {
    return this.usersService.signin(signinDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
