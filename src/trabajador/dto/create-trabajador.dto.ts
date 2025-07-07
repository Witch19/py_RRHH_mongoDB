import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateTrabajadorDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;

  @IsMongoId()
  tipoTrabajoId: string;
}