import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) { }

  async create(country: Country): Promise<Country> {
    const createdCountry = new this.countryModel(country);
    return createdCountry.save();
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findByCountries(list: string): Promise<Country> {
    return this.countryModel.findOne({ country: { $in: list } }).exec();
  }
}
