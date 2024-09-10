import { HttpResponse } from 'msw';

type StatusType = 400 | 401 | 403 | 404 | 500 | 0 | 200;
export const mockHttpStatusCase = (
  httpStatus: StatusType,
  data: any
): HttpResponse => {
  return httpStatus !== 200
    ? new HttpResponse(null, {
        status: httpStatus,
      })
    : HttpResponse.json({
        status: 200,
        body: {
          status: 'OK',
          data: data,
        },
      });
};
