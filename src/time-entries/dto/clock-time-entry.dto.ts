import { IsInt, IsPositive } from "class-validator";

export class ClockTimeEntryDto{
    @IsInt()
    @IsPositive()
    userId: number;
}