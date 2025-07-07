import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TipoTrabajoModule } from './tipo-trabajo/tipo-trabajo.module';
import { CursosTrabajadoresModule } from './cursos-trabajadores/cursos-trabajadores.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { AuthModule } from './auth/auth.module';
import { CursoModule } from './curso/curso.module';
import { TipoTrabajoController } from './tipo-trabajo/tipo-trabajo.controller';
import { TipoTrabajoService } from './tipo-trabajo/tipo-trabajo.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // Tus módulos que usen MongoDB
    AuthModule,
    TipoTrabajoModule,
    CursosTrabajadoresModule,
    SolicitudesModule,
    TrabajadorModule,
    CursoModule,
  ],
  controllers: [AppController, TipoTrabajoController],
  providers: [AppService, TipoTrabajoService],
})
export class AppModule {}