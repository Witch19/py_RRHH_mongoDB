import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({ ...dto, password: hashedPassword });
    await newUser.save();
    return { message: 'Usuario registrado correctamente' };
  }

  async login(dto: LoginAuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }
}
