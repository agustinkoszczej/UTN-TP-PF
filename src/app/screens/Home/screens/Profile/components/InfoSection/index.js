import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { WIDTH } from '@constants/platform';

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;

const SecondRoute = () => <Text style={[styles.scene, { backgroundColor: '#673ab7' }]}> Hola</Text>;

class InfoSection extends Component {
  state = {
    index: 0,
    routes: [{ key: 'company', title: 'Compañía' }, { key: 'location', title: 'Ubicación' }]
  };

  renderTabBar = props => <TabBar {...props} scrollEnabled />;

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          company: FirstRoute,
          location: SecondRoute
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

export default InfoSection;
