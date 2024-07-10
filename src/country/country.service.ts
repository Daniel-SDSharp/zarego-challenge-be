import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) { }

  // Create a new country entry
  async create(country: Country): Promise<Country> {
    const createdCountry = new this.countryModel(country);
    return createdCountry.save();
  }

  // Retrieve all countries
  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  // Find a country by name
  async findByCountries(list: string): Promise<Country> {
    return this.countryModel.findOne({ country: { $in: list } }).exec();
  }
}
