export type Player = {
  name?: string;
  frames: Array<Frame>;
};

export type Frame = {
  firstRoll?: RollScore | 'strike';
  secondRoll?: RollScore | 'spare' | 'strike';
  thirdRoll?: RollScore | 'spare' | 'strike';
  currentScore?: number;
};

export type RollScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
