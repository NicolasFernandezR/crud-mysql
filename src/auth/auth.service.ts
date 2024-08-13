import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto){
        const user = await this.usersService.findOneByEmail(registerDto.email);
        if(user){
            throw new BadRequestException('User already exists');
        }
        const newUser = {
            ...registerDto,
            password: await bcrypt.hash(registerDto.password, 10),
        }
        return await this.usersService.create(newUser);
    }

    async login(loginDto: LoginDto){
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if(!user) throw new UnauthorizedException('invalid credentials');

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
        if(!isPasswordValid) throw new UnauthorizedException('invalid credentials')
        
        const payload = { email: user.email}

        const token = await this.jwtService.signAsync(payload)
        return {
            token,
            email: user.email,
        };
    }
}

