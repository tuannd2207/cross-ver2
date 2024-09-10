import { StatusEnum } from '@app/app.enum';

export const fakeArray = (length: number) => Array(length).fill(0);

export const randomId = (): string =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);

export const getStatus = (index: number) => {
  const statuses = Object.keys(StatusEnum);
  return statuses[index % 3]; // Sử dụng để lặp lại các trạng thái
};
