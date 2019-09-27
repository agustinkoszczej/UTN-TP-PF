import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import tronsauce from 'reactotron-apisauce';

const reactotron = Reactotron.configure({host:'192.168.0.100'})
  .useReactNative()
  .use(reactotronRedux())
  .use(asyncStorage())
  .use(tronsauce())
  .connect();

export default reactotron;
