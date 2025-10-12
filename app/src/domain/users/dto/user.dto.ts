import { PartialType } from '@nestjs/mapped-types';


export class CreateUserDto {
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    companyId: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ReturnUserDto {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
    company?: ReturnCompanyDto
}
