import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';
import { UpdateLeituraDto } from './dto/update-leitura.dto';

@Controller('leituras')
export class LeiturasController {
  constructor(private readonly leiturasService: LeiturasService) {}

  @Post()
  create(@Body() createLeituraDto: CreateLeituraDto) {
    return this.leiturasService.create(createLeituraDto);
  }

  @Get()
  findAll() {
    return this.leiturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeituraDto: UpdateLeituraDto) {
    return this.leiturasService.update(+id, updateLeituraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(+id);
  }
}
