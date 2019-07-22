import { bool, func, number, shape, string } from 'prop-types';

export const navigationModel = {
  addListener: func.isRequired,
  getParam: func.isRequired,
  goBack: func.isRequired,
  navigate: func.isRequired,
  popToTop: func.isRequired,
  reset: func.isRequired,
  replace: func.isRequired,
  setParams: func.isRequired,
  state: shape({
    key: string,
    isTransitioning: bool,
    index: number
  })
};
