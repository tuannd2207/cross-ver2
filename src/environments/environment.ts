// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appVersion: 'v8.1.8',
  USERDATA_KEY: 'auth41c71cad44a14a6193c5',
  isMockEnabled: true,
  appId: 'EBANK_REGISTER',
  // ldapLoginUrl: 'https://gwint-apidev.seabank.com.vn:9443/seabank/seabank-internal/api/v1/ebankregister/jwtad/login',
  ldapLoginUrl: 'http://localhost:8080/api/ldap/authenticate',
  feApiUrl: 'http://10.2.254.70:8080/api/rest/process',
  xIbmClientId: 'a96f621e935af9c9b3906c4e74c53b6b',
  xIbmClientSecret: '6a84df20bdbc3b4f89b1014bd089fc4c',
  headerLdapLogin: {
    location: '0.0.0.0',
    context: 'PC',
    channel: 'ebank-register',
    subChannel: 'ebank-register',
  },
  headerFeApi: {
    reqType: 'REQUEST',
    api: 'EBANK_REGISTER_FE_API',
    priority: '3',
    channel: 'ebank-register',
    subChannel: 'ebank-register',
    context: 'WEB',
    userID: '',
    synasyn: 'true',
  },
};
