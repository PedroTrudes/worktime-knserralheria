import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
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
        return this.users
    }

    findOne(id: number){
        const user = this.users.find((user) => user.id === id);

        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }

        return user;
    }

    create(createUserDto: CreateUserDto){
        const user = {
            id: this.users.length + 1,
            ...createUserDto
        }

        this.users.push(user);

        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto){
        const user = this.findOne(id);
        console.log("ANtes: ", user);
        console.log("DTO: ", updateUserDto)

        const update = Object.fromEntries(
            Object.entries(updateUserDto).filter(
                ([, value]) => value !== undefined)
        );

        Object.assign(user, update);
        console.log("Depois: ", user);
        return user;
        
    }

    delete(id: number){
        const user = this.findOne(id);
        const index = this.users.findIndex((user) => user.id === id);

        this.users.splice(index, 1);
    
        return "Removido com sucesso";
    }
}
