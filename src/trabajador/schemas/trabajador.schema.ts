import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrabajadorDocument = Trabajador & Document;

@Schema()
export class Trabajador {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'TipoTrabajo', required: true })
  tipoTrabajo: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CursosTrabajadores' }], default: [] })
  cursos: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Solicitud' }], default: [] })
  solicitudes: Types.ObjectId[];
}

export const TrabajadorSchema = SchemaFactory.createForClass(Trabajador);
