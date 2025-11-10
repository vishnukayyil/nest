
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsIn(['Pending', 'In Progress', 'Completed'])
  status?: 'Pending' | 'In Progress' | 'Completed';
}
