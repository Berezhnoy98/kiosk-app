import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  imageUrl!: string;
}
