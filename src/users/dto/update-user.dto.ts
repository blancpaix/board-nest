import { PartialType } from '@nestjs/mapped-types';
import { SignupUserDto } from './signupUser.dto';

export class UpdateUserDto extends PartialType(SignupUserDto) {}
