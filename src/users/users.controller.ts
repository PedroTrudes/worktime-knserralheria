import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(":id")
    findById(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Patch(":id")
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto){
        return this.userService.update(id, updateUserDto);      
    }

    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id : number){
        return this.userService.delete(id);
    }

}
