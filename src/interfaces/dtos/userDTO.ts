import { IsString, MinLength, MaxLength } from 'class-validator';

export class userDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(255)
  password: string;
}
