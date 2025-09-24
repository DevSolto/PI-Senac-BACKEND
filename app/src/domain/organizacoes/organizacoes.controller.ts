import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacoesService } from './organizacoes.service';
import { CreateOrganizacoeDto } from './dto/create-organizacoe.dto';
import { UpdateOrganizacoeDto } from './dto/update-organizacoe.dto';

@Controller('organizacoes')
export class OrganizacoesController {
  constructor(private readonly organizacoesService: OrganizacoesService) {}

  @Post()
  create(@Body() createOrganizacoeDto: CreateOrganizacoeDto) {
    return this.organizacoesService.create(createOrganizacoeDto);
  }

  @Get()
  findAll() {
    return this.organizacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizacoeDto: UpdateOrganizacoeDto) {
    return this.organizacoesService.update(+id, updateOrganizacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacoesService.remove(+id);
  }
}
