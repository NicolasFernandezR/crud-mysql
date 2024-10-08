import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  
  constructor (
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}
  
  async create(createBreedDto: CreateBreedDto) {
    const race = this.breedRepository.create(createBreedDto);
    return await this.breedRepository.save(race);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: string) {
    return `This action returns a #${id} breed`;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  async remove(id: string) {
    return `This action removes a #${id} breed`;
  }
}
