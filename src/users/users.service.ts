import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService){}
    
    private readonly users = [
            {
                id: 1,
                name: "pedro",
                email: "pedro.jtrudes@gmail.com"
            },
            {
                id: 2,
                name: "bima",
                email: "bimael@gmail.com"
            }
        ]

    findAll(){
        return this.prisma.user.findMany();
    }

    async findOne(id: number){
        const user = await this.prisma.user.findUnique({where: {
            id: id
        }});

        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }

        return user;
    }

    async create(createUserDto: CreateUserDto){
        const user = await this.prisma.user.create({
            data: createUserDto,
            select: {
                id: true,
                username: true,
                name: true,
                role: true
            }
        });
        
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        
        const userValid = await this.prisma.user.findUnique(
            {where: {id: id}});
        if(!userValid){
            throw new NotFoundException("Usuario não encontrado");
        }
        const updateUser = await this.prisma.user.update(
            {where: {id: id}, 
            data: updateUserDto
        })
    
        return updateUser;
        
    }

    async delete(id: number){
        const user = await this.prisma.user.findUnique({where: {id: id}})
        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }
        await this.prisma.user.delete({where: {id: id}});
        return "Removido com sucesso";
    }
}
