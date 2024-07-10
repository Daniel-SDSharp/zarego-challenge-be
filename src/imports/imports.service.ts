import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { Leadership } from '../schemas/leadership.schema';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImportsService {
  private readonly logger = new Logger(ImportsService.name);

  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(Leadership.name) private leadershipModel: Model<Leadership>,
  ) { }

  // Import data from a CSV file and store it in the database
  async importDataFromCsv(): Promise<void> {
    const filePath = path.join('../zarego-be/src/input/globaldatainput.csv');

    try {
      this.logger.log('Started reading CSV data from local file.');

      const results: Leadership[] = [];
      const countries: Partial<Country>[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          const leadershipEntry: Partial<Leadership> = {
            id: data.country,
            country_name: data.country_name,
            performance_oriented: parseFloat(data.performance_oriented),
            autocratic: parseFloat(data.autocratic),
            modesty: parseFloat(data.modesty),
            country_cluster: data.country_cluster,
            charisma: parseFloat(data.charismatic_1_visionary),
            decisive: parseFloat(data.decisive),
            date_added: new Date().toLocaleString().split(',')[0],
          };
          results.push(leadershipEntry as Leadership);
          countries.push({
            country: data.country,
            country_name: data.country_name,
          });
        })
        .on('end', async () => {
          await this.leadershipModel.insertMany(results);
          await this.countryModel.insertMany(countries);
          this.logger.log('Data has been imported successfully.');
        })
        .on('error', (err) => {
          console.error(`Error while reading CSV data: ${err.message}`);
        });
    } catch (err) {
      console.error(`Failed to read CSV data from local file: ${err.message}`);
    }
  }
}
