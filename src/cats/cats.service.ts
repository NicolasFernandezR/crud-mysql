import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>
  ) { 

  }
  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto); // Crear una instancia de la entidad y la valida
    return await this.catRepository.save(cat); // Guardar en la base de datos
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: string) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return await this.catRepository.update({ id }, updateCatDto);
  }

  async remove(id: string) {
    return await this.catRepository.softDelete({ id });
  }
}
