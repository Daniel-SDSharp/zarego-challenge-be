import { Controller, Get } from '@nestjs/common';
import { ImportsService } from './imports.service';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) { }

  //Populates DB with CSV data
  @Get()
  async importDataFromCsv(): Promise<any> {
    await this.importsService.importDataFromCsv();
  }
}
