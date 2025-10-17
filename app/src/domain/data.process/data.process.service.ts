import { Injectable } from '@nestjs/common';
import { CreateDataProcessDto } from './dto/data.process.dto';
import { UpdateDataProcessDto } from './dto/update-data.process.dto';

@Injectable()
export class DataProcessService {
  create(createDataProcessDto: CreateDataProcessDto) {
    return 'This action adds a new dataProcess';
  }

  findAll() {
    return `This action returns all dataProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataProcess`;
  }

  update(id: number, updateDataProcessDto: UpdateDataProcessDto) {
    return `This action updates a #${id} dataProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataProcess`;
  }
}
