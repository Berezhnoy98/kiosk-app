import { IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
