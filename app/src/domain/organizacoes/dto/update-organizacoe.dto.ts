import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizacoeDto } from './create-organizacoe.dto';

export class UpdateOrganizacoeDto extends PartialType(CreateOrganizacoeDto) {}
