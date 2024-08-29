import { ISystemParameter } from '../models/system-parameters.model';
import { fakeArray } from '../../../share/utils/common';
import { StatusEnum } from '@app/app.enum';

const getStatus = (index: number) => {
  const statuses = Object.keys(StatusEnum);
  return statuses[index % 3]; // Sử dụng modulo để lặp lại các trạng thái
};

const systemParametersData: ISystemParameter[] = fakeArray(48).map(
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
