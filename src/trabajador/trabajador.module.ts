import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { Trabajador, TrabajadorSchema } from './schemas/trabajador.schema';
import { TipoTrabajo, TipoTrabajoSchema } from '../tipo-trabajo/schemas/tipo-trabajo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trabajador.name, schema: TrabajadorSchema },
      { name: TipoTrabajo.name, schema: TipoTrabajoSchema },
    ]),
  ],
  providers: [TrabajadorService],
  controllers: [TrabajadorController],
})
export class TrabajadorModule {}
