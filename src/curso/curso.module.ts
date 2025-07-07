import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Curso, CursoSchema } from './schemas/curso.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Curso.name, schema: CursoSchema }])],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [MongooseModule], // para que cursos-trabajadores lo pueda importar
})
export class CursoModule {}