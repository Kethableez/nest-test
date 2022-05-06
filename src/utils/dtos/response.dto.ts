import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty()
  message: string;
}
