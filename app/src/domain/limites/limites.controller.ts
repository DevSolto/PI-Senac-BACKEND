import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LimitesService } from './limites.service';
import { CreateLimiteDto } from './dto/create-limite.dto';
import { UpdateLimiteDto } from './dto/update-limite.dto';

@Controller('limites')
export class LimitesController {
  constructor(private readonly limitesService: LimitesService) {}

  @Post()
  create(@Body() createLimiteDto: CreateLimiteDto) {
    return this.limitesService.create(createLimiteDto);
  }

  @Get()
  findAll() {
    return this.limitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.limitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLimiteDto: UpdateLimiteDto) {
    return this.limitesService.update(+id, updateLimiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.limitesService.remove(+id);
  }
}
