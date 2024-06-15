import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

import type { PlayerDTO } from 'api-interfaces';

@Schema()
export class PlayerSignin {
  @Prop()
  amount: number;

  @Prop()
  currency: string;
}

@Schema()
export class Player implements PlayerDTO {
  @Prop()
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  position: string;

  @Prop()
  thumbnail: string;

  @Prop()
  born: Date;

  @Prop()
  signin: PlayerSignin;
}

export type PlayerDocument = HydratedDocument<Player>;

export const PlayerSchema = SchemaFactory.createForClass(Player);