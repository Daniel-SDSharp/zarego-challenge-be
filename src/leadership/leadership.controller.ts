import { Controller, Get, Query } from '@nestjs/common';
import { LeadershipService } from './leadership.service';
import { Leadership } from '../schemas/leadership.schema';

@Controller('leadership')
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) { }

  // Endpoint to list all leadership data with pagination
  @Get('all')
  async listAll(
    @Query('page') page: number = 1,
    @Query('rows') rows: number = 50,
  ): Promise<{ metadata: any; data: Leadership[] }> {
    return this.leadershipService.listAll(page, rows);
  }

  // Endpoint to find leadership data by a list of countries with pagination
  @Get('countries')
  async findByCountries(
    @Query('list') countries: string,
    @Query('page') page: number = 1,
    @Query('rows') rows: number = 50,
  ): Promise<{ metadata: any; data: Leadership[] }> {
    const countryList = countries.split(',');
    return this.leadershipService.findByCountries(countryList, page, rows);
  }
}
