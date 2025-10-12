import { PartialType } from '@nestjs/mapped-types';
import { CreateDataProcessDto } from './create-data.process.dto';

export class UpdateDataProcessDto extends PartialType(CreateDataProcessDto) {}
