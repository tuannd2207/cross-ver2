import { http } from 'msw';
import {
  managerList,
  userInfoApprove,
  userResponse,
  users,
} from '../mock-data/user-management.mock';
import { mockHttpStatusCase } from '../mock.constant';

const url = 'http://localhost:8080/api/rest/process';

export const user_handler = [
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
    if (user) {
      user.status = user?.status === 'PENDING' ? 'ACTIVE' : user.status;
    }
    return mockHttpStatusCase(200, user);
  }),

  http.post(`${url}/getAllUsersByStatusActive`, () => {
    return mockHttpStatusCase(200, managerList);
  }),

  http.post(`${url}/getUserNewAndOld`, () => {
    return mockHttpStatusCase(200, userInfoApprove);
  }),

  http.post(`${url}/approveOrRejectSystemParameter`, () => {
    return mockHttpStatusCase(200, {
      action: true,
    });
  }),
];
