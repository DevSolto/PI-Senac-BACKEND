import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUser(id: number) {
    const user = await this.userService.findById(id);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  // MFA: gera secret base32
  generateMfaSecret(userId: number) {
    const secret = speakeasy.generateSecret({ name: `AppName (${userId})` });
    this.userService.update(userId, { mfaSecret: secret.base32 });
    return secret.otpauth_url;
  }

  // MFA: valida código TOTP
  verifyMfa(user: any, code: string) {
    if (!user.mfaSecret) throw new UnauthorizedException('MFA not enabled');

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) throw new UnauthorizedException('Invalid MFA code');
    return true;
  }
}
