import { Body, Controller, Param, ParseIntPipe, Post, Get, Query, Search } from '@nestjs/common';
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

    @Get('')
    findByMonth(
        @Query('initMonth', ParseIntPipe) initMonth: number,
        @Query('year', ParseIntPipe) year: number
){
        return this.timeEntriesService.findByMonth(initMonth, year);
    }

}
