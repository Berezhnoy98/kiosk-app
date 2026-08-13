import { IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
