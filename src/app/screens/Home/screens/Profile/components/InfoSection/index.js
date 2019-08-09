/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { WIDTH } from '@constants/platform';
import { formatLocation } from '@constants/geolocation';
import { userModel } from '@propTypes/userModel';

import LocationSection from './components/LocationSection';
import { routes } from './constants';
import styles from './styles';

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]} />;

class InfoSection extends Component {
  state = {
    index: 0,
    routes
  };

  renderTabBar = props => <TabBar {...props} style={styles.tabBar} scrollEnabled />;

  renderLocation = () => {
    const {
      currentUser: { streetAddress, latitude, longitude }
    } = this.props;
    return <LocationSection {...formatLocation({ longitude, latitude })} streetAddress={streetAddress} />;
  };

  handleIndexChange = index => this.setState({ index });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          company: FirstRoute,
          location: this.renderLocation
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        initialLayout={WIDTH * 0.9}
        style={styles.tabView}
      />
    );
  }
}

InfoSection.propTypes = {
  currentUser: PropTypes.shape(userModel).isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(InfoSection);
