export const getRandomInteger = (
  digits: number,
  min: number = Math.pow(10, digits - 1),
  max: number = Math.pow(10, digits) - 1
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export interface ICourse {
  id: number;
  code: string;
  name: string;
  category: string;
  slot: string;
  faculty: string;
  venue: string;
  credit: string;
}
