import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoTrabajoController } from './tipo-trabajo.controller';
import { TipoTrabajoService } from './tipo-trabajo.service';
import { TipoTrabajo, TipoTrabajoSchema } from './schemas/tipo-trabajo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TipoTrabajo.name, schema: TipoTrabajoSchema }]),
  ],
  controllers: [TipoTrabajoController],
  providers: [TipoTrabajoService],
  exports: [MongooseModule],
})
export class TipoTrabajoModule {}
