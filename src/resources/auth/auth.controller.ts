import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: SignInDto) {
    const { email, password } = body;

    const response = await this.authService.signIn(email, password);

    if (!response) {
      throw new BadRequestException('Invalid credentials');
    }

    return response;
  }
}
