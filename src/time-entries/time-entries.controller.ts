import { Body, Controller, Param, ParseIntPipe, Post, Get } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service.js';
import { ClockTimeEntryDto } from './dto/clock-time-entry.dto.js';

@Controller('time-entries')
export class TimeEntriesController {
    constructor(private readonly timeEntriesService: TimeEntriesService){}

    @Post('clock')
    create(@Body() clockTimeEntryDto: ClockTimeEntryDto){
        return this.timeEntriesService.clock(clockTimeEntryDto.userId);
    }

    @Get('user/:userId')
    findById(@Param('userId', ParseIntPipe) userId : number){
        return this.timeEntriesService.findAllByUser(userId);
    }
    /* 
    @Get()
    findAll(){
    }
    @Get(":id")
    findById(@Param('id', ParseIntPipe) id : Number){
        return
    }
    
    */


}
