import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Trabajador, TrabajadorDocument } from './schemas/trabajador.schema';
import { TipoTrabajo, TipoTrabajoDocument } from '../tipo-trabajo/schemas/tipo-trabajo.schema';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Injectable()
export class TrabajadorService {
  constructor(
    @InjectModel(Trabajador.name)
    private readonly trabajadorModel: Model<TrabajadorDocument>,

    @InjectModel(TipoTrabajo.name)
    private readonly tipoTrabajoModel: Model<TipoTrabajoDocument>,
  ) {}

  async create(dto: CreateTrabajadorDto) {
    const tipoTrabajo = await this.tipoTrabajoModel.findById(dto.tipoTrabajoId);
    if (!tipoTrabajo) throw new NotFoundException('Tipo de trabajo no encontrado');

    const trabajador = new this.trabajadorModel({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      tipoTrabajo: tipoTrabajo._id,
    });

    return trabajador.save();
  }

  findAll() {
    return this.trabajadorModel.find().populate('tipoTrabajo').exec();
  }

  async findOne(id: string) {
    const trabajador = await this.trabajadorModel.findById(id).populate('tipoTrabajo').exec();
    if (!trabajador) throw new NotFoundException('Trabajador no encontrado');
    return trabajador;
  }

  async update(id: string, dto: UpdateTrabajadorDto) {
    const updateData: any = { ...dto };

    if (dto.tipoTrabajoId) {
      const tipoTrabajo = await this.tipoTrabajoModel.findById(dto.tipoTrabajoId);
      if (!tipoTrabajo) throw new NotFoundException('Tipo de trabajo no encontrado');
      updateData.tipoTrabajo = tipoTrabajo._id;
    }

    const trabajador = await this.trabajadorModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!trabajador) throw new NotFoundException('Trabajador no encontrado');

    return trabajador;
  }

  async remove(id: string) {
    const deleted = await this.trabajadorModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Trabajador no encontrado');
    return deleted;
  }
}