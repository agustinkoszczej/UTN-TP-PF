import React from 'react';
import { ScrollView } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Loadable from '@components/Loadable';

import styles from './styles';
import HeaderSection from './components/HeaderSection';
import InfoSection from './components/InfoSection';

function Profile() {
  return (
    <ScrollView style={styles.container}>
      <HeaderSection />
      <InfoSection />
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  loading: state.auth.currentUserLoading
});

const enhance = compose(
  connect(mapStateToProps),
  Loadable(props => props.loading)
);

export default enhance(Profile);
