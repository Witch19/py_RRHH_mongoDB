import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Solicitud, SolicitudDocument } from './schemas/solicitudes.schema';
import { CreateSolicitudDto } from './dto/create-solicitude.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: Model<SolicitudDocument>,
  ) {}

  create(dto: CreateSolicitudDto) {
    const solicitud = new this.solicitudModel({
      ...dto,
      trabajador: new Types.ObjectId(dto.trabajadorId),
    });
    return solicitud.save();
  }

  findAll() {
    return this.solicitudModel.find().populate('trabajador').exec();
  }

  async findOne(id: string) {
    const solicitud = await this.solicitudModel.findById(id).populate('trabajador').exec();
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    return solicitud;
  }

  async update(id: string, updateData: Partial<CreateSolicitudDto>) {
    if (updateData.trabajadorId) {
      updateData['trabajador'] = new Types.ObjectId(updateData.trabajadorId);
      delete updateData.trabajadorId;
    }

    const updated = await this.solicitudModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updated) throw new NotFoundException('Solicitud no encontrada');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.solicitudModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Solicitud no encontrada');
    return deleted;
  }
}