import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomTextInput from '@components/CustomTextInput';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import waveIcon from '@assets/wave.png';
import { navigationModel } from '@propTypes/navigationModel';
import { currentUser } from '@services/ChatService';

import styles from './styles';

class Chats extends Component {
  static getDerivedStateFromProps({ rooms }, { loaded }) {
    if (!loaded && !!rooms.length) {
      return { rooms, loaded: true };
    }
    return null;
  }

  state = { rooms: [], loaded: false, typingText: false }; // eslint-disable-line

  // FIXME: Boilerplate with SupplierChat.js (move to another class?)
  subscribeToRoom = roomId => {
    currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: this.onReceive,
        onUserStartedTyping: () =>
          this.setState({
            typingText: true
          }),
        onUserStoppedTyping: () =>
          this.setState({
            typingText: false
          })
      },
      messageLimit: 1 // Only last message
    });
  };

  // FIXME: Boilerplate with SupplierChat.js (move to another class?)
  messageSerializer = message => {
    const { supplierName, supplierPicture } = this.props;
    const { id, senderId, text, createdAt } = message;
    return {
      _id: id,
      text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: supplierName,
        avatar: supplierPicture
      }
    };
  };

  onReceive = message => {
    // const incomingMessage = this.messageSerializer(message);
    // WIP: Add it to the corresponding room
  };

  handleTextSubmit = () => {};

  handleInputChange = name => {
    const { rooms } = this.props;
    const filterRooms = rooms.filter(({ supplierName }) => {
      return supplierName.includes(name);
    });
    this.setState({ rooms: filterRooms });
  };

  selectSupplier = ({ supplierId, supplierName, supplierPicture, roomId }) => () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.SupplierChat, { supplierId, supplierName, supplierPicture, roomId });
  };

  renderItem = ({ item }) => {
    const { roomId, supplierName, supplierPicture } = item;
    // this.subscribeToRoom(roomId);
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <View style={styles.item}>
          <Image source={{ uri: supplierPicture }} style={styles.supplierPicture} />
          <CustomText bold>{supplierName}</CustomText>
          <Image style={styles.wave} source={waveIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ roomId }) => `${roomId}`;

  render() {
    const { rooms } = this.state;
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Contacto"
          style={styles.formElement}
          autoCapitalize="words"
          underline
          onChange={this.handleInputChange}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={rooms} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
        )}
      </View>
    );
  }
}

Chats.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired
};

const mapStateToProps = state => ({
  rooms: state.chat.rooms,
  loading: state.chat.roomsLoading,
  userId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(Chats);
