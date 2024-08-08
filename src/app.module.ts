import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';


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
    BreedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
