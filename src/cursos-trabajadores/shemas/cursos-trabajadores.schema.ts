import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CursosTrabajadoresDocument = CursosTrabajadores & Document;

@Schema()
export class CursosTrabajadores {
  @Prop({ type: Types.ObjectId, ref: 'Trabajador', required: true })
  trabajador: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso', required: true })
  curso: Types.ObjectId;

  @Prop({ type: Date, required: true })
  fechaRealizacion: Date;

  @Prop({ default: false })
  aprobado: boolean;
}

export const CursosTrabajadoresSchema = SchemaFactory.createForClass(CursosTrabajadores);