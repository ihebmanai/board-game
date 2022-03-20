import { MoveType } from '../enums/move-type.enum';

export interface History {
  playerMove: MoveType,
  botMove: MoveType
}