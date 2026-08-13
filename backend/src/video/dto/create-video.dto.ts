import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  videoUrl: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;
}
