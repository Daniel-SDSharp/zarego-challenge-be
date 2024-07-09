import { Module } from '@nestjs/common';
import { LeadershipModule } from 'src/leadership/leadership.module';
import { CountryModule } from 'src/country/country.module';
import { ImportsService } from './imports.service';
import { ImportsController } from './imports.controller';

@Module({
  imports: [LeadershipModule, CountryModule],
  controllers: [ImportsController],
  providers: [ImportsService],
})
export class ImportsModule { }
