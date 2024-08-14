import { Breed } from 'src/breeds/entities/breed.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // column es un decorador que se encarga de mapear la propiedad a una columna de la tabla
  @Column()
  name: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  daleteAt: Date;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    // ManyToOne es un decorador que se encarga de mapear la relación entre dos entidades
    eager: true, // eager es un booleano que indica si la relación debe ser cargada automáticamente cuando se recupera la entidad
  })
  breed: Breed; // breed es una propiedad que representa la relación entre Cat y Breed
}
