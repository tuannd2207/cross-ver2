import { ISystemParameter } from '../models/system-parameters.model';
import { StatusEnum } from '@app/app.enum';
import { fakeArray } from '../../../../share/utils/common';

const getStatus = (index: number) => {
  const statuses = Object.keys(StatusEnum);
  return statuses[index % 3]; // Sử dụng modulo để lặp lại các trạng thái
};

const systemParametersData: ISystemParameter[] = fakeArray(6).map(
  (_, i) =>
    ({
      id: i,
      name: 'System parameter' + i,
      description: 'System parameter' + i,
      status: getStatus(i),
      value: i.toString(),
    }) as ISystemParameter
);

export default systemParametersData;
