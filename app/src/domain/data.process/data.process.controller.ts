import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataProcessService } from './data.process.service';
import { CreateDataProcessDto } from './dto/create-data.process.dto';
import { UpdateDataProcessDto } from './dto/update-data.process.dto';

@Controller('data.process')
export class DataProcessController {
  constructor(private readonly dataProcessService: DataProcessService) {}

  @Post()
  create(@Body() createDataProcessDto: CreateDataProcessDto) {
    return this.dataProcessService.create(createDataProcessDto);
  }

  @Get()
  findAll() {
    return this.dataProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataProcessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataProcessDto: UpdateDataProcessDto) {
    return this.dataProcessService.update(+id, updateDataProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataProcessService.remove(+id);
  }
}
