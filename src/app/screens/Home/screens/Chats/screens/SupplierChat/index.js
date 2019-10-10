import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import sendIcon from '@assets/right-arrow.png';
import { withProps, compose } from 'recompose';
import { currentUser } from '@services/ChatService';

import styles from './styles';

class SupplierChat extends React.Component {
  state = {
    messages: [],
    quantity: 10,
    typingText: false,
    text: ''
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

  onSend(message){
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
    // this.setState({
    //   messages: this.getMessages()
    // });
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
    const text = props.text.trim();
    if (text.length > 0) {
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
          <Text style={styles.typingText}>Esta tipeando</Text>
        </View>
      );
    }
    return null;
  };

  handleTextChange = text => this.setState({ text });

  onSend = (messages = []) => {
    this.handleTextChange('');
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  };

  render() {
    const { messages, text } = this.state;
    const { userId } = this.props;
    return (
      <GiftedChat
        messages={messages}
        placeholder="Escribe un mensaje"
        isAnimated
        loadEarlier
        //onSend={messages => this.onSend(messages)}
        //onLoadEarlier={this.onLoadEarlier}
        user={{ _id: userId }}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderLoadEarlier={this.renderLoadEarlier}
        renderFooter={this.renderFooter}
        text={text}
        onInputTextChanged={this.handleTextChange}
      />
    );
  }
}

SupplierChat.propTypes = {
  supplierId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  supplierPicture: PropTypes.string.isRequired,
  supplierName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.currentUser.id
});

const enhancer = compose(
  withProps(({ navigation }) => {
    const supplierId = navigation.getParam('supplierId');
    const roomId = navigation.getParam('roomId');
    const supplierPicture = navigation.getParam('supplierPicture');
    const supplierName = navigation.getParam('supplierName');
    return { supplierId, supplierPicture, roomId, supplierName };
  }),
  connect(mapStateToProps)
);

export default enhancer(SupplierChat);
