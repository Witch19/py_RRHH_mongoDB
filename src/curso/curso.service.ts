import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Curso, CursoDocument } from './schemas/curso.schema';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectModel(Curso.name) private readonly cursoModel: Model<CursoDocument>,
  ) {}

  async create(dto: CreateCursoDto): Promise<Curso> {
    const createdCurso = new this.cursoModel(dto);
    return createdCurso.save();
  }

  async findAll(): Promise<Curso[]> {
    return this.cursoModel.find().exec();
  }

  async findOne(id: string): Promise<Curso> {
    const curso = await this.cursoModel.findById(id).exec();
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  async update(id: string, dto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  async remove(id: string): Promise<Curso> {
    const curso = await this.cursoModel.findByIdAndDelete(id).exec();
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }
}