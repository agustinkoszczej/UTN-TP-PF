import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { WIDTH } from '@constants/platform';
import { formatLocation } from '@constants/geolocation';

import LocationSection from './components/LocationSection';

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]} />;

class InfoSection extends Component {
  state = {
    index: 0,
    routes: [{ key: 'company', title: 'Compañía' }, { key: 'location', title: 'Ubicación' }]
  };

  renderTabBar = props => <TabBar {...props} scrollEnabled />;

  renderLocation = () => <LocationSection {...formatLocation(this.props.currentUser)} />;

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          company: FirstRoute,
          location: this.renderLocation
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={WIDTH}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(InfoSection);
