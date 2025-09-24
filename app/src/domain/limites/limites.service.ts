import { Injectable } from '@nestjs/common';
import { CreateLimiteDto } from './dto/create-limite.dto';
import { UpdateLimiteDto } from './dto/update-limite.dto';

@Injectable()
export class LimitesService {
  create(createLimiteDto: CreateLimiteDto) {
    return 'This action adds a new limite';
  }

  findAll() {
    return `This action returns all limites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} limite`;
  }

  update(id: number, updateLimiteDto: UpdateLimiteDto) {
    return `This action updates a #${id} limite`;
  }

  remove(id: number) {
    return `This action removes a #${id} limite`;
  }
}
