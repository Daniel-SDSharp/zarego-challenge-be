import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadershipModule } from './leadership/leadership.module';
import { CountryModule } from './country/country.module';
import { ImportsModule } from './imports/imports.module';
import { MONGODB_URL } from './const';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    LeadershipModule,
    CountryModule,
    ImportsModule,
  ],
})
export class AppModule { }
