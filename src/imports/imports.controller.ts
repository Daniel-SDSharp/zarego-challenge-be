import { Controller, Get } from '@nestjs/common';
import { ImportsService } from './imports.service';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) { }

  @Get()
  async importDataFromCsv(): Promise<any> {
    await this.importsService.importDataFromCsv();
  }
}
