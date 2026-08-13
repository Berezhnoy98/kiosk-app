import { IsString, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateNewsSourceDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
