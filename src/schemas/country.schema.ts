import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
  @Prop({ unique: true })
  country: string;

  @Prop({ unique: true })
  country_name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);