import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import sendIcon from '@assets/right-arrow.png'
import styles from './styles';

//import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

export default class SupplierChat extends React.Component {
  state = {
    messages: [],
    quantity: 10,
    typingText: false
  }

  supplierId = this.props.navigation.getParam('user_id')
  supplierName = this.props.navigation.getParam('name')
  supplierPicture = this.props.navigation.getParam('avatar_url')
  supplierRoomId = this.props.navigation.getParam('room_id')

  componentDidMount() {
    this.currentUser.subscribeToRoom({
      roomId: this.supplierRoomId,
      hooks: {
        onMessage: this.onReceive,
        onUserStartedTyping: this.setState({
          typingText: true
        }),
        onUserStoppedTyping: this.setState({
          typingText: false
        })
      },
    });
    getMessages();
  };

  getMessages = () => {
    const { quantity } = this.state;
    this.currentUser.fetchMultipartMessages({
      roomId: this.supplierRoomId,
      direction: 'newer',
      limit: quantity,
    })
      .then(pusherMessages => {
        this.setState({
          messages: pusherMessages
        });
      })
      .catch(err => {
        console.log(`Error fetching messages: ${err}`)
      })
    this.setState(previousState => ({
      quantity: previousState.quantity + 10
    }));
  };

  onSend(message) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: this.supplierRoomId
    });
  };

  onReceive = message => {
    const { id, senderId, text, createdAt } = message;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: this.supplierPicture //TODO: check if its merch or supp picture
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onLoadEarlier() {
    this.setState({
      messages: getMessages()
    })
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'black',
          },
        }}
      />
    )
  };

  renderSend = props => { //FIX ME: clear text when message sent
    if (props.text.trim().length > 0) {
      this.currentUser.isTypingIn({ roomId: this.roomId })
      return (
        <TouchableOpacity onPress={() => this.onSend(props)}>
          <View>
            <Image source={sendIcon} style={styles.send} />
          </View>
        </TouchableOpacity >
      );
    }
    return null;
  };

  renderLoadEarlier = props => {
    return (
      <TouchableOpacity style={styles.earlierContainer} onPress={this.onLoadEarlier}>
        <CustomText style={styles.earlierText}>Cargar más mensajes</CustomText>
      </TouchableOpacity>
    );
    return null;
  };

  renderFooter = props => {
    if (this.state.typingText) {
      return (
        <View>
          <Text style={styles.typingText}>{this.state.typingText}</Text>
        </View>
      )
    }
    return null
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        placeholder="Escribe un mensaje"
        isAnimated={true}
        loadEarlier={true}
        //onLoadEarlier={this.onLoadEarlier()}
        user={{
          _id: 'auth0|5d4f974c5559f40e2bc139d7', //TODO: my user id
        }}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderLoadEarlier={this.renderLoadEarlier}
      //renderFooter={this.renderFooter}
      />
    )
  };
}

SupplierChat.propTypes = {
  supplierId: PropTypes.string.isRequired,
  supplierRoomId: PropTypes.string.isRequired,
  supplierPicture: PropTypes.string.isRequired,
  supplierName: PropTypes.string.isRequired,
};
