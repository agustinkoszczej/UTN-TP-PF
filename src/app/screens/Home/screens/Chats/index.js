import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import CustomTextInput from '@components/CustomTextInput';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import { navigationModel } from '@propTypes/navigationModel';
import Loadable from '@components/Loadable';
import sendedIcon from '@assets/forward-arrow.png';
import { currentUser } from '@services/ChatService';

import styles from './styles';

class Chats extends Component {
  static getDerivedStateFromProps({ rooms }, { loaded }) {
    if (!loaded && !!rooms.length) {
      return { rooms, loaded: true };
    }
    return null;
  }

  state = { rooms: [], loaded: false, typingText: false, lastMessages: [] }; // eslint-disable-line

  componentDidMount() {
    const { rooms } = this.state;
    rooms.forEach(({ roomId }) => this.subscribeToRoom(roomId));
  }

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
    const { userId } = this.props;
    const { roomId, senderId, text, createdAt } = message;
    return {
      roomId,
      text,
      createdAt: new Date(createdAt),
      sendByMe: userId === senderId
    };
  };

  onReceive = message => {
    const { lastMessages } = this.state;
    const lastMessage = this.messageSerializer(message);
    const lastMessageRoom = lastMessages.find(
      lastMessageState => lastMessageState.roomId === lastMessage.roomId
    );
    this.setState(prevState => {
      if (lastMessageRoom) {
        return [
          ...prevState.filter(lastMessageState => lastMessageState.roomId === lastMessage.roomId),
          lastMessage
        ];
      }
      return {
        ...prevState,
        lastMessages: [...prevState.lastMessages, lastMessage]
      };
    });

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
    const { lastMessages } = this.state;
    const message = lastMessages.find(lastMessage => roomId === lastMessage.roomId);
    const text = message?.text || '';
    const sended = message?.sendByMe;
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <View style={styles.item}>
          <Image source={{ uri: supplierPicture }} style={styles.supplierPicture} />
          <CustomText bold>{supplierName}</CustomText>
          {sended && <Image source={sendedIcon} style={styles.sended} />}
          <CustomText style={styles.messageText}>{text}</CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ roomId }) => `${roomId}`;

  render() {
    const { rooms, lastMessages } = this.state;
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Contacto"
          style={styles.formElement}
          autoCapitalize="words"
          underline
          onChange={this.handleInputChange}
        />
        <FlatList
          data={rooms}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={{ lastMessages }}
        />
      </View>
    );
  }
}

Chats.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
  userId: PropTypes.string.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired
};

const mapStateToProps = state => ({
  rooms: state.chat.rooms,
  loading: state.chat.roomsLoading,
  userId: state.auth.currentUser.id
});

const enhancer = compose(
  connect(mapStateToProps),
  Loadable(props => props.loading)
);

export default enhancer(Chats);
