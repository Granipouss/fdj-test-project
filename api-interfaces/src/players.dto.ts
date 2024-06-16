export type PlayerDTO = {
  id: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: string; // Date String
};
