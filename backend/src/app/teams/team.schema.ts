import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

import type { TeamDTO } from 'api-interfaces';

@Schema()
export class Team implements TeamDTO {
  @Prop()
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  position: string;

  @Prop()
  thumbnail: string;

  @Prop()
  players: ObjectId[];
}

export type TeamDocument = HydratedDocument<Team>;

export const TeamSchema = SchemaFactory.createForClass(Team);
