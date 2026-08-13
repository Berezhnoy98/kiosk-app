import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateVideoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;
}
