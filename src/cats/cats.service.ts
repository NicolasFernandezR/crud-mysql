import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { 

  }
  async create(createCatDto: CreateCatDto) {
    const breedFind = await this.breedRepository.findOneBy({ name: createCatDto.breed}); // Buscar la raza en la base de datos
    if(!breedFind) throw new BadRequestException('Breed not found');
    const cat = {
      ...createCatDto,
      breed: breedFind
    }
    const catUpdate = this.catRepository.create(cat); // Crear una instancia de la entidad y la valida
    return await this.catRepository.save(catUpdate); // Guardar en la base de datos
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: string) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const catFind = await this.catRepository.findOneBy({ id }); // Buscar el gato en la base de datos
    if(!catFind) throw new BadRequestException('Cat not found');
    let breedFind; // Variable para guardar la raza
    if(updateCatDto.breed){
      breedFind = await this.breedRepository.findOneBy({ name: updateCatDto.breed}); // Buscar la raza en la base de datos
      if(!breedFind) throw new BadRequestException('Breed not found');
    }
    const cat = { // Crear un objeto con los datos a actualizar
      ...catFind,
      ...updateCatDto,
      breed: breedFind
    }
    return await this.catRepository.update({ id }, cat); // Actualizar en la base de datos
  }

  async remove(id: string) {
    return await this.catRepository.softDelete({ id });
  }
}
