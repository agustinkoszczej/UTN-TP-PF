import Reactotron from 'reactotron-react-native';
import { create } from 'apisauce';

const baseURL = 'https://sellyapi-env.9ust4eptpw.us-east-1.elasticbeanstalk.com/';

const api = create({
  baseURL,
  timeout: 10000
});

export const headers = {
  AUTHORIZATION: 'Authorization'
};

export const setAuthHeader = token => api.setHeader(headers.AUTHORIZATION, `Bearer ${token}`);

api.addMonitor(Reactotron.apisauce);

// eslint-disable-next-line no-unused-vars
export const apiSetup = () => {
  api.addMonitor(response => {
    if (response.status === 401) {
      // dispatch(actions.sessionExpired());
      console.warn('Unhandled session expiration');
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // dispatch(actions.noInternetConnection());
      console.warn('Unhandled request without connection');
    }
  });
};

export default api;
