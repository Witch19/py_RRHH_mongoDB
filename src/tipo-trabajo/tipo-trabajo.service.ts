import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoTrabajo, TipoTrabajoDocument } from './schemas/tipo-trabajo.schema';
import { CreateTipoTrabajoDto } from './dto/create-tipo-trabajo.dto';
import { UpdateTipoTrabajoDto } from './dto/update-tipo-trabajo.dto';

@Injectable()
export class TipoTrabajoService {
  constructor(
    @InjectModel(TipoTrabajo.name)
    private readonly tipoTrabajoModel: Model<TipoTrabajoDocument>,
  ) {}

  create(createDto: CreateTipoTrabajoDto) {
    const nuevo = new this.tipoTrabajoModel(createDto);
    return nuevo.save();
  }

  findAll() {
    return this.tipoTrabajoModel.find().exec();
  }

  async findOne(id: string) {
    const tipo = await this.tipoTrabajoModel.findById(id).exec();
    if (!tipo) {
      throw new NotFoundException(`TipoTrabajo con id ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: string, updateDto: UpdateTipoTrabajoDto) {
    const actualizado = await this.tipoTrabajoModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!actualizado) {
      throw new NotFoundException(`TipoTrabajo con id ${id} no encontrado`);
    }
    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.tipoTrabajoModel.findByIdAndDelete(id).exec();
    if (!eliminado) {
      throw new NotFoundException(`TipoTrabajo con id ${id} no encontrado`);
    }
    return eliminado;
  }
}
