import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { Solicitud, SolicitudSchema } from './schemas/solicitudes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Solicitud.name, schema: SolicitudSchema }]),
  ],
  providers: [SolicitudesService],
  controllers: [SolicitudesController],
})
export class SolicitudesModule {}