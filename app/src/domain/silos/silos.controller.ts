import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SilosService } from './silos.service';
import { CreateSiloDto } from './dto/silo.dto';
import { UpdateSiloDto } from './dto/update-silo.dto';

@Controller('silos')
export class SilosController {
  constructor(private readonly silosService: SilosService) {}

  @Post()
  create(@Body() createSiloDto: CreateSiloDto) {
    return this.silosService.create(createSiloDto);
  }

  @Get()
  findAll() {
    return this.silosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.silosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiloDto: UpdateSiloDto) {
    return this.silosService.update(+id, updateSiloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.silosService.remove(+id);
  }
}
