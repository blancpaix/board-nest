import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from './dto/signupUser.dto';
import { SigninUserDto } from './dto/signinUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const hashSaltRound = 11;

const jwtOptions = {
  expiresIn: '1h',
  issuer: 'http://localhost:3000',
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 이것도 사실은 리턴할걸로 dto 만들어서 써야겠지??
  async findUser(email: string): Promise<User | any> {
    const user = await this.usersRepository.find({
      select: {
        password: true,
      },
      where: {
        email,
      },
    });

    return user;
  }

  // 이것도 토큰하나 전송하는데 DTO를 만드는게 좋나???
  async signin(signinUserDto: SigninUserDto) {
    const user = await this.findUser(signinUserDto.email);
    if (user.length == 0)
      throw new HttpException('그런회원 없음', HttpStatus.NOT_ACCEPTABLE);

    const compareResult = await bcrypt.compare(
      signinUserDto.password,
      user[0].password,
    );
    if (compareResult) {
      const accessToken = await this.jwtService.signAsync(
        {
          user: user.email,
        },
        jwtOptions,
      );

      return accessToken;
    }
    throw new HttpException('비밀번호 불일치', HttpStatus.NOT_ACCEPTABLE);
  }

  async signup(signupUserDto: SignupUserDto) {
    const hashedPassword = await bcrypt.hash(
      signupUserDto.password,
      hashSaltRound,
    );
    signupUserDto.password = hashedPassword;
    const user = this.usersRepository.create(signupUserDto);
    this.usersRepository.save(user);

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
