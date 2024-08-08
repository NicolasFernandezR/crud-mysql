import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    // column es un decorador que se encarga de mapear la propiedad a una columna de la tabla
    @Column()
    name: string;
    
    @Column()
    age: number;
    
    @Column()
    breed: string;

    @DeleteDateColumn()
    daleteAt: Date;
}
