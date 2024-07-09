import { Controller, Get, Query } from '@nestjs/common';
import { LeadershipService } from './leadership.service';
import { Leadership } from 'src/schemas/leadership.schema';

@Controller('leadership')
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) { }

  @Get('/')
  async listAll(): Promise<Leadership[]> {
    return this.leadershipService.listAll();
  }

  @Get('countries')
  async listPerCountry(
    @Query('list') countries: string,
  ): Promise<Leadership[]> {
    const countryList = countries.split(',');
    return this.leadershipService.findByCountries(countryList);
  }
}
