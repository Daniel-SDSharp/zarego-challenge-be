import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leadership } from '../schemas/leadership.schema';

@Injectable()
export class LeadershipService {
  constructor(
    @InjectModel(Leadership.name) private leadershipModel: Model<Leadership>,
  ) { }

  // List all leadership data with pagination
  async listAll(
    page: number = 1,
    rows: number = 50,
  ): Promise<{
    metadata: any;
    data: Leadership[];
  }> {
    const totalRegisters = await this.leadershipModel.countDocuments();
    const data = await this.leadershipModel
      .find()
      .skip((page - 1) * rows)
      .limit(rows)
      .exec();

    return {
      metadata: {
        page,
        rows,
        total_registers: totalRegisters,
      },
      data,
    };
  }

  // Find leadership data by a list of countries with pagination
  async findByCountries(
    countries: string[],
    page: number = 1,
    rows: number = 50,
  ): Promise<{ metadata: any; data: Leadership[] }> {
    const query = { id: { $in: countries } };
    const totalRegisters = await this.leadershipModel.countDocuments();
    const rowCount = await this.leadershipModel.find(query).countDocuments();
    const data = await this.leadershipModel
      .find(query)
      .skip((page - 1) * rows)
      .limit(rows)
      .exec();

    return {
      metadata: {
        page,
        rows,
        row_count: rowCount,
        total_registers: totalRegisters,
      },
      data,
    };
  }
}
