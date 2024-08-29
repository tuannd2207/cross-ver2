import 'mock/browser';

export const environment = {
  production: false,
  appVersion: 'v8.1.8',
  USERDATA_KEY: 'auth41c71cad44a14a6193c5',
  isMockEnabled: true,
  appId: 'BAN_CHEO',
  // ldapLoginUrl: 'https://gwint-apidev.seabank.com.vn:9443/seabank/seabank-internal/api/v1/ebankregister/jwtad/login',
  ldapLoginUrl: 'http://10.2.254.70:8080/api/ldap/authenticate',
  feApiUrl: 'http://localhost:8080/api/rest/process',
  xIbmClientId: 'a96f621e935af9c9b3906c4e74c53b6b',
  xIbmClientSecret: '6a84df20bdbc3b4f89b1014bd089fc4c',
  logoutTime: 5, // in minutes
  headerLdapLogin: {
    location: '0.0.0.0',
    context: 'PC',
    channel: 'ebank-register',
    subChannel: 'ebank-register',
  },
  headerFeApi: {
    reqType: 'REQUEST',
    api: 'BAN_CHEO_FE_API',
    apiKey: '0fa6310bac21a4457dab517e46e81fef',
    priority: '3',
    channel: 'ebank-register',
    subChannel: 'ebank-register',
    context: 'WEB',
    userID: '',
    synasyn: 'true',
  },
};
