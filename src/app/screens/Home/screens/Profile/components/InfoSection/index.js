import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';

import { WIDTH, SLIDES } from './constants';

class InfoSection extends Component {
  renderItem({ item, index }) {
    const Component = item.component;
    return <View>{Component && <Component />}</View>;
  }

  render() {
    return <Carousel data={SLIDES} renderItem={this.renderItem} sliderWidth={WIDTH} itemWidth={WIDTH} />;
  }
}

export default InfoSection;
