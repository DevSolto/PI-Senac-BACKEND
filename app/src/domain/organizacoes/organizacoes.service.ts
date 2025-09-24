import { Injectable } from '@nestjs/common';
import { CreateOrganizacoeDto } from './dto/create-organizacoe.dto';
import { UpdateOrganizacoeDto } from './dto/update-organizacoe.dto';

@Injectable()
export class OrganizacoesService {
  create(createOrganizacoeDto: CreateOrganizacoeDto) {
    return 'This action adds a new organizacoe';
  }

  findAll() {
    return `This action returns all organizacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacoe`;
  }

  update(id: number, updateOrganizacoeDto: UpdateOrganizacoeDto) {
    return `This action updates a #${id} organizacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacoe`;
  }
}
