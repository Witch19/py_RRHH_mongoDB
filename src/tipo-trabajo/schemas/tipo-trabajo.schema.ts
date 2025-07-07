import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TipoTrabajoDocument = TipoTrabajo & Document;

@Schema()
export class TipoTrabajo {
  @Prop({ required: true })
  nombre: string;

  // Si luego quieres obtener los trabajadores relacionados, puedes poblar esta propiedad.
  @Prop({ type: [Types.ObjectId], ref: 'Trabajador', default: [] })
  trabajadores: Types.ObjectId[];
}

export const TipoTrabajoSchema = SchemaFactory.createForClass(TipoTrabajo);