import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMenuItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
