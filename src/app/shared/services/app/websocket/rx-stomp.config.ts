import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';


export const RxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:61613',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'teste',
    passcode: 'teste',
    'client-id': 'TributalizaClient'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 10000, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
   // console.log(new Date(), msg);
  }
};
