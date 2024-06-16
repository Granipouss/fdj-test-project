import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Player, PlayerSchema } from './player.schema';
import { PlayersService } from './players.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
