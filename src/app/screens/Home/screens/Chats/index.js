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
import { messageSerializer } from '@utils/chatUtils';

import styles from './styles';
import { lastMessage } from './utils';

class Chats extends Component {
  static getDerivedStateFromProps({ rooms }, { loaded }) {
    if (!loaded && !!rooms.length) {
      return { rooms, loaded: true };
    }
    return null;
  }

  state = { rooms: [], loaded: false, typingText: false }; // eslint-disable-line

  componentDidMount() {
    const { rooms } = this.state;
    this.reload = this.props.navigation.addListener('willFocus', () => {
      rooms.forEach(({ roomId }) => this.subscribeToRoom(roomId));
    });
  }

  componentWillUnmount() {
    this.reload.remove();
  }

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

  onReceive = message => {
    const incomingMessage = messageSerializer(message);
    this.setState(prevState => {
      return {
        ...prevState,
        rooms: [
          ...prevState.rooms.map(room =>
            room.roomId === incomingMessage.roomId
              ? {
                  ...room,
                  lastMessageAt: incomingMessage.createdAt,
                  message: incomingMessage
                }
              : room
          )
        ].sort((r1, r2) => {
          if (!r1.lastMessageAt && !r2.lastMessageAt) return 0;
          if (!r1.lastMessageAt) return 1;
          if (!r2.lastMessageAt) return -1;
          return r1.lastMessageAt > r2.lastMessageAt ? -1 : 1;
        })
      };
    });
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
    const { userId } = this.props;
    const { rooms } = this.state;
    const message = rooms.find(r => roomId === r.roomId)?.message;
    const text = message?.text || '';
    const sended = message?.user?._id === userId;
    const time = message?.createdAt ? lastMessage(message.createdAt) : '';
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <Image source={{ uri: supplierPicture }} style={styles.supplierPicture} />
        <View style={styles.item}>
          <CustomText bold>{supplierName}</CustomText>
          {sended && <Image source={sendedIcon} style={styles.sended} />}
          <CustomText style={styles.messageText}>{text}</CustomText>
          <CustomText style={styles.timeText}>{time}</CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ roomId }) => `${roomId}`;

  render() {
    const { rooms } = this.state;
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Contacto"
          style={styles.formElement}
          autoCapitalize="words"
          underline
          onChange={this.handleInputChange}
        />
        <FlatList data={rooms} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
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
