import { IsNotEmpty } from 'class-validator';

export class CreateTipoTrabajoDto {
  @IsNotEmpty()
  nombre: string;
}
