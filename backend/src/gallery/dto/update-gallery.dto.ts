import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateGalleryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
