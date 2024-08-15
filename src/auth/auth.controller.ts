import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Rol } from './emuns/rol.enum';
import { Auth } from './decorators/auth.decorator';

// Se crea una interfaz que extiende de Request para agregar la propiedad user
interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('/profile')
  // @Roles(Rol.User)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return req.user;
  // }

  @Get('/profile')
  @Auth(Rol.User)
  profile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
