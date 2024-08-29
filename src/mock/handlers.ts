// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import {
  managerList,
  userResponse,
  users,
} from './data-mocks/user-management.mock';

const url = 'http://localhost:8080/api/rest/process';
type StatusType = 400 | 401 | 403 | 404 | 500 | 0 | 200;
const mockHttpStatusCase = (
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
export const handlers = [
  http.post(`${url}/getUsersByPage`, async ({ request }) => {
    const requestBody: any = await request.json();
    console.log(requestBody);
    return mockHttpStatusCase(200, userResponse);
  }),

  http.post(`${url}/addUser`, async ({ request }) => {
    const requestBody: any = await request.json();
    requestBody.body.data.id = String(Math.random());
    users.push(requestBody.body.data);
    return mockHttpStatusCase(200, requestBody.body.data);
  }),

  http.post(`${url}/getUserById`, async ({ request }) => {
    const requestBody: any = await request.json();
    const user = users.find((user) => user.id === requestBody.body.data);
    return mockHttpStatusCase(200, user);
  }),

  http.post(`${url}/getAllUsersByStatusActive`, () => {
    return mockHttpStatusCase(200, managerList);
  }),
];
