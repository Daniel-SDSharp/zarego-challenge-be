import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Leadership extends Document {
  @Prop() country: string;
  @Prop() country_name: string;
  @Prop() performance_oriented: number;
  @Prop() autocratic: number;
  @Prop() modesty: number;
  @Prop() charismatic_3_self_sacrifice: number;
  @Prop() team_1_collaborative_team_orientation: number;
  @Prop() decisive: number;
  @Prop() diplomatic: number;
  @Prop() face_saver: number;
  @Prop() charismatic_1_visionary: number;
  @Prop() humane_oriented: number;
  @Prop() integrity: number;
  @Prop() bureaucratic_originally_labeled_procedural: number;
  @Prop() administratively_competent: number;
  @Prop() self_centred: number;
  @Prop() autonomous: number;
  @Prop() status_conscious: number;
  @Prop() charismatic_2_inspirational: number;
  @Prop() malevolent: number;
  @Prop() team_2_team_integrator: number;
  @Prop() internally_competitive_originally_labeled_conflict_inducer: number;
  @Prop() participative: number;
  @Prop() charismatic_value_based_global_leadership_dimension: number;
  @Prop() team_oriented_global_leadership_dimension: number;
  @Prop() self_protective_global_leadership_dimension: number;
  @Prop() participative_global_leadership_dimension: number;
  @Prop() humane_oriented_global_leadership_dimension: number;
  @Prop() autonomous_global_leadership_dimension: number;
  @Prop() country_cluster: string;
}

export const LeadershipSchema = SchemaFactory.createForClass(Leadership);
