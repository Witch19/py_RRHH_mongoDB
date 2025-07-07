import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CursoDocument = Curso & Document;

@Schema()
export class Curso {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  // Agrega otros campos según tu entidad original
}

export const CursoSchema = SchemaFactory.createForClass(Curso);
