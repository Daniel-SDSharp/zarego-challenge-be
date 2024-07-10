import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { Leadership } from '../schemas/leadership.schema';
import * as csv from 'csv-parser';
import axios from 'axios';
import { CSV_URL } from 'src/const';

@Injectable()
export class ImportsService {
  private readonly logger = new Logger(ImportsService.name);

  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(Leadership.name) private leadershipModel: Model<Leadership>,
  ) { }

  // Import data from a CSV file and store it in the database
  async importDataFromCsv(): Promise<void> {
    const fileUrl = CSV_URL;

    try {
      this.logger.log('Started reading CSV data from URL.');

      const results: Leadership[] = [];
      const countries: Partial<Country>[] = [];

      const response = await axios.get(fileUrl, { responseType: 'stream' });

      response.data
        .pipe(csv())
        .on('data', (data) => {
          const leadershipEntry: Partial<Leadership> = {
            id: data.Country,
            country_name: data['Country Name'],
            performance_oriented: data['Performance Oriented'],
            autocratic: parseFloat(data['Autocratic']),
            modesty: parseFloat(data['Modesty']),
            country_cluster: data['Country Cluster'],
            charisma: parseFloat(data['Charismatic 1: Visionary']),
            decisive: parseFloat(data['Decisive']),
            date_added: new Date().toLocaleString().split(',')[0],
          };
          results.push(leadershipEntry as Leadership);
          countries.push({
            country: data['Country'],
            country_name: data['Country Name'],
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
      console.error(`Failed to read CSV data from URL: ${err.message}`);
    }
  }
}
