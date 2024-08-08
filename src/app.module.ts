import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    CatsModule,
    // configuracion de la conexion a la base de datos
    TypeOrmModule.forRoot({ 
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user_crud",
      password: "root",
      database: "db_crud",
      autoLoadEntities: true, // carga las entidades de forma automatica
      synchronize: true, // no usar en produccion
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
