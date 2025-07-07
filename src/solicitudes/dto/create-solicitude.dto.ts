import { IsNotEmpty, IsDateString, IsEnum, IsMongoId } from 'class-validator';
import { EstadoSolicitud } from '../schemas/solicitudes.schema'; 

export class CreateSolicitudDto {
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud; // opcional

  @IsMongoId()
  @IsNotEmpty()
  trabajadorId: string; // requerido para establecer la relación
}