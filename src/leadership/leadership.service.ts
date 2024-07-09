import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leadership } from '../schemas/leadership.schema';

@Injectable()
export class LeadershipService {
  constructor(
    @InjectModel(Leadership.name) private leadershipModel: Model<Leadership>,
  ) { }

  async listAll(): Promise<Leadership[]> {
    try {
      return this.leadershipModel.find().exec();
    } catch (err) {
      console.error(`Failed to read CSV data from local file: ${err.message}`);
    }
  }

  async findByCountries(countries: string[]): Promise<Leadership[]> {
    return this.leadershipModel.find({ country: { $in: countries } }).exec();
  }
}
