import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
