import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, MfaDto } from './dto/auth.dto';
import { Public } from './decorators/decorator.jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // rota pública, não precisa de JWT
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (user.mfa && !dto.mfaCode) {
      return { mfaRequired: true };
    }

    if (user.mfa && dto.mfaCode) {
      this.authService.verifyMfa(user, dto.mfaCode);
    }

    return this.authService.login(user);
  }

  @Post('mfa/setup') // JWT já é global, não precisa colocar UseGuards
  async setupMfa(@Request() req) {
    return this.authService.generateMfaSecret(req.user.id);
  }

  @Post('mfa/verify')
  async verifyMfa(@Request() req, @Body() dto: MfaDto) {
    const user = await this.authService.getUser(req.user.id);
    return this.authService.verifyMfa(user, dto.mfaCode);
  }
}
