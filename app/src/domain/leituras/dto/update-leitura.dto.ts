import { PartialType } from '@nestjs/mapped-types';
import { CreateLeituraDto } from './create-leitura.dto';

export class UpdateLeituraDto extends PartialType(CreateLeituraDto) {}
