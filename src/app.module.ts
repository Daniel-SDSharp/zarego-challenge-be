import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadershipModule } from './leadership/leadership.module';
import { CountryModule } from './country/country.module';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    LeadershipModule,
    CountryModule,
    ImportsModule,
  ],
})
export class AppModule { }
