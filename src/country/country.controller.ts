import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '../schemas/country.schema';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get('findByName')
  async findByName(@Query('name') name: string): Promise<Country> {
    return this.countryService.findByName(name);
  }
}
