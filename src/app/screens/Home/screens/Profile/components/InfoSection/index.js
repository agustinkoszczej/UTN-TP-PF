/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { WIDTH } from '@constants/platform';
import { userModel } from '@propTypes/userModel';

import LocationSection from './components/LocationSection';
import CompanySection from './components/CompanySection';
import { routes } from './constants';
import styles from './styles';

class InfoSection extends Component {
  state = {
    index: 0,
    routes
  };

  renderTabBar = props => <TabBar {...props} style={styles.tabBar} scrollEnabled />;

  renderLocation = () => {
    const { supplier } = this.props;
    return <LocationSection supplier={supplier} />;
  };

  renderCompany = () => {
    const { supplier } = this.props;
    return <CompanySection supplier={supplier} />;
  };

  handleIndexChange = index => this.setState({ index });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          company: this.renderCompany,
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
  currentUser: PropTypes.shape(userModel),
  supplier: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.supplier ? state.auth.currentSupplier : state.auth.currentUser
});

export default connect(mapStateToProps)(InfoSection);
