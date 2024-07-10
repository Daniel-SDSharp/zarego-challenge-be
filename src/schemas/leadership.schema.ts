import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Model for each country's leadership data
@Schema()
export class Leadership extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  country_name: string;

  @Prop({ required: true })
  performance_oriented: number;

  @Prop({ required: true })
  autocratic: number;

  @Prop({ required: true })
  modesty: number;

  @Prop({ required: false })
  country_cluster: string;

  @Prop({ required: true })
  charisma: number;

  @Prop({ required: true })
  decisive: number;

  @Prop({ required: true })
  date_added: string;
}

export const LeadershipSchema = SchemaFactory.createForClass(Leadership);
