import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import tronsauce from 'reactotron-apisauce';

const reactotron = Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())
  .use(asyncStorage())
  .use(tronsauce())
  .connect();

export default reactotron;
