import { IsString, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class UpdateNewsSourceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
