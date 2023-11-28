import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtGuard } from '../guards/auth.guard';

export function Authenticate() {
  return applyDecorators(UseGuards(JwtGuard));
}
