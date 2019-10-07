import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import sendIcon from '@assets/right-arrow.png';
import { withProps } from 'recompose';
import { currentUser } from '@services/ChatService';

import styles from './styles';

// import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class SupplierChat extends React.Component {
  state = {
    messages: [],
    quantity: 10,
    typingText: false
  };

  componentDidMount() {
    const { roomId } = this.props;
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
      }
    });
    this.getMessages();
  }

  getMessages = async () => {
    const { quantity } = this.state;
    const { roomId } = this.props;
    const messages = await currentUser.fetchMultipartMessages({
      roomId,
      direction: 'newer',
      limit: quantity
    });
    this.setState(previousState => ({
      messages,
      quantity: previousState.quantity + 10
    }));
  };

  onSend = message => {
    const { roomId } = this.props;
    currentUser.sendMessage({
      text: message.text,
      roomId
    });
  };

  onReceive = message => {
    const { id, senderId, text, createdAt } = message;
    const { supplierPicture } = this.props;
    const incomingMessage = {
      _id: id,
      text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: supplierPicture
      }
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  };

  onLoadEarlier = () => {
    this.setState({
      messages: this.getMessages()
    });
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'black'
          }
        }}
      />
    );
  };

  renderSend = props => {
    // FIX ME: clear text when message sent
    if (props.text.trim().length > 0) {
      currentUser.isTypingIn({ roomId: this.props.roomId });
      return (
        <TouchableOpacity onPress={() => this.onSend(props)}>
          <View>
            <Image source={sendIcon} style={styles.send} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  renderLoadEarlier = () => {
    return (
      <TouchableOpacity style={styles.earlierContainer} onPress={this.onLoadEarlier}>
        <CustomText style={styles.earlierText}>Cargar más mensajes</CustomText>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.state.typingText) {
      return (
        <View>
          <Text style={styles.typingText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const { messages } = this.state;
    return (
      <GiftedChat
        messages={messages}
        placeholder="Escribe un mensaje"
        isAnimated
        loadEarlier
        onSend={() => {}}
        onLoadEarlier={this.onLoadEarlier}
        user={{
          _id: 'auth0|5d4f974c5559f40e2bc139d7' // TODO: my user id
        }}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderLoadEarlier={this.renderLoadEarlier}
        renderFooter={this.renderFooter}
      />
    );
  }
}

SupplierChat.propTypes = {
  supplierId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  supplierPicture: PropTypes.string.isRequired,
  supplierName: PropTypes.string.isRequired
};

export default withProps(({ navigation }) => {
  const supplierId = navigation.getParam('supplierId');
  const roomId = navigation.getParam('id');
  const supplierPicture = navigation.getParam('avatarUrl');
  const supplierName = navigation.getParam('name');
  return { supplierId, supplierPicture, roomId, supplierName };
})(SupplierChat);
