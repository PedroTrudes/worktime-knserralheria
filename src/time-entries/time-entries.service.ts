import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TimeEntryType } from '../generated/prisma/enums.js';
import { start } from 'repl';

@Injectable()
export class TimeEntriesService {
    constructor(private readonly prisma: PrismaService){}

    async clock(userId: number){
        const user = await this.prisma.user.findUnique({where: {id: userId}});
        if(!user){
            throw new NotFoundException("Usuario não localizado")
        }

        const lastEntry = await this.prisma.timeEntry.findFirst({
            where: {
                userId,
            },
            orderBy: {
                timestamp: 'desc'
            }
        })

        let NextType : TimeEntryType;
        if(!lastEntry){
            NextType = TimeEntryType.ENTRY;
        } else if (lastEntry.type === TimeEntryType.ENTRY){
            NextType = TimeEntryType.EXIT
        } else {
            NextType = TimeEntryType.ENTRY;
        }

        return this.prisma.timeEntry.create({
            data: {
                userId,
                type: NextType,
            }
        })
    }

    async findAllByUser(userId: number){
        const user = await this.prisma.user.findUnique({where: {id: userId}})
        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }   

        const listUserEntry = this.prisma.timeEntry.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                timestamp: "desc"
            }
        })

        return listUserEntry
    }

    async findByMonth(initMonth: number, year: number){
        const startDate = new Date(Date.UTC(year, initMonth -1, 1));
        const endDate = new Date(Date.UTC(year, initMonth, 1));

        if(initMonth > 12 || initMonth < 1 || !Number.isInteger(initMonth)){
            throw new BadRequestException("Insira um mês valido")
        }
        if(!Number.isInteger(year)){
            throw new BadRequestException("Insira um ano valido")
        }

        const timeByMonth = await this.prisma.timeEntry.findMany({
            where: {
                timestamp: {
                    gte: startDate,
                    lt: endDate
                },
            }
        }) 

        return timeByMonth;
    }

}