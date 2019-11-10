import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomButton from '@components/CustomButton';
import reloadIcon from '@assets/reload.png';
import ChatsActions from '@redux/chat/actions';

import styles from './styles';

class ReloadChatsButton extends Component {
  handlePress = () => {
    const { refresChats, id } = this.props;
    refresChats(id);
  };

  render() {
    return <CustomButton icon={reloadIcon} onPress={this.handlePress} style={styles.icon} />;
  }
}

ReloadChatsButton.propTypes = {
  refresChats: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.currentUser.id
});

const mapDispatchToProps = {
  refresChats: ChatsActions.connectPusher
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReloadChatsButton);
