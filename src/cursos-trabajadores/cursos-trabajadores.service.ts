import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CursosTrabajadores, CursosTrabajadoresDocument } from './shemas/cursos-trabajadores.schema';
import { CreateCursosTrabajadoresDto } from './dto/create-cursos-trabajadores.dto';
import { UpdateCursosTrabajadoresDto } from './dto/update-cursos-trabajadores.dto';

@Injectable()
export class CursosTrabajadoresService {
  constructor(
    @InjectModel(CursosTrabajadores.name)
    private readonly cursosTrabajadoresModel: Model<CursosTrabajadoresDocument>,
  ) {}

  async create(dto: CreateCursosTrabajadoresDto) {
    const nuevaRelacion = new this.cursosTrabajadoresModel({
      trabajador: new Types.ObjectId(dto.trabajadorId),
      curso: new Types.ObjectId(dto.cursoId),
      fechaRealizacion: dto.fechaRealizacion,
      aprobado: dto.aprobado,
    });

    return nuevaRelacion.save();
  }

  findAll() {
    return this.cursosTrabajadoresModel.find()
      .populate('trabajador')
      .populate('curso')
      .exec();
  }

  async findOne(id: string) {
    const registro = await this.cursosTrabajadoresModel.findById(id)
      .populate('trabajador')
      .populate('curso')
      .exec();

    if (!registro) throw new NotFoundException('Registro no encontrado');
    return registro;
  }

  async update(id: string, dto: UpdateCursosTrabajadoresDto) {
    const updated = await this.cursosTrabajadoresModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        trabajador: dto.trabajadorId ? new Types.ObjectId(dto.trabajadorId) : undefined,
        curso: dto.cursoId ? new Types.ObjectId(dto.cursoId) : undefined,
      },
      { new: true },
    ).exec();

    if (!updated) throw new NotFoundException('Registro no encontrado');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cursosTrabajadoresModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Registro no encontrado');
    return deleted;
  }
}