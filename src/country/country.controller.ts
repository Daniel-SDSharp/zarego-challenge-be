import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '../schemas/country.schema';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  // Endpoint to find all countries
  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }
}
