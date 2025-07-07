import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosTrabajadoresService } from './cursos-trabajadores.service';
import { CursosTrabajadoresController } from './cursos-trabajadores.controller';
import { CursosTrabajadores, CursosTrabajadoresSchema } from './shemas/cursos-trabajadores.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CursosTrabajadores.name, schema: CursosTrabajadoresSchema }])
  ],
  controllers: [CursosTrabajadoresController],
  providers: [CursosTrabajadoresService],
})
export class CursosTrabajadoresModule {}
