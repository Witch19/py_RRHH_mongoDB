import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
}

export type SolicitudDocument = Solicitud & Document;

@Schema()
export class Solicitud {
  @Prop({ required: true })
  tipo: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: Date, required: true })
  fechaInicio: Date;

  @Prop({ type: Date, required: true })
  fechaFin: Date;

  @Prop({ type: String, enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE })
  estado: EstadoSolicitud;

  @Prop({ type: Types.ObjectId, ref: 'Trabajador', required: true })
  trabajador: Types.ObjectId;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
