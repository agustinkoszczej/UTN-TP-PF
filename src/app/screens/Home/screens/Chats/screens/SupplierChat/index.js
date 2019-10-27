import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import sendIcon from '@assets/right-arrow.png';
import { withProps, compose } from 'recompose';
import { currentUser } from '@services/ChatService';
import { messageSerializer, LOAD_EARLIER_QUANTITY } from '@utils/chatUtils';
import { navigationModel } from '@propTypes/navigationModel';

import styles from './styles';

class SupplierChat extends React.Component {
  state = {
    messages: [],
    typingText: false,
    text: ''
  };

  componentDidMount() {
    const { roomId, navigation } = this.props;
    currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onPresenceChanged: state => {
          navigation.setParams({ supplierStatus: state.current });
        },
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
      messageLimit: LOAD_EARLIER_QUANTITY
    });
  }

  getOlderMessages = async fromMsgId => {
    const { roomId, supplierName, supplierPicture } = this.props;
    const newMessages = await currentUser.fetchMessages({
      roomId,
      direction: 'older',
      limit: LOAD_EARLIER_QUANTITY,
      initialId: fromMsgId
    });
    return newMessages.map(message => messageSerializer(message, supplierName, supplierPicture)).reverse();
  };

  onSend = messages => {
    const { roomId } = this.props;
    currentUser.sendMessage({
      text: messages.text,
      roomId
    });
    this.handleTextChange('');
  };

  onReceive = message => {
    const { supplierName, supplierPicture } = this.props;
    const incomingMessage = messageSerializer(message, supplierName, supplierPicture);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  };

  onLoadEarlier = async () => {
    const { messages } = this.state;
    const lastMessageId = messages[messages.length - 1]._id; // eslint-disable-line

    if (messages.length % LOAD_EARLIER_QUANTITY === 0) {
      const earlierMessages = await this.getOlderMessages(lastMessageId);
      this.setState(previousState => ({
        messages: GiftedChat.append(earlierMessages, previousState.messages)
      }));
    }
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
          <Text style={styles.typingText}>{this.props.supplierName} está escribiendo un mensaje</Text>
        </View>
      );
    }
    return null;
  };

  handleTextChange = text => this.setState({ text });

  render() {
    const { messages, text } = this.state;
    const { userId } = this.props;
    return (
      <GiftedChat
        textInputProps={{ autoFocus: true }}
        messages={messages}
        placeholder="Escribe un mensaje"
        isAnimated
        loadEarlier={messages.length % LOAD_EARLIER_QUANTITY === 0}
        user={{ _id: userId }}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderLoadEarlier={this.renderLoadEarlier}
        renderFooter={this.renderFooter}
        text={text}
        onInputTextChanged={this.handleTextChange}
        listViewProps={{
          onEndReached: this.onLoadEarlier.bind(this),
          onEndReachedThreshold: 0.5
        }}
      />
    );
  }
}

SupplierChat.propTypes = {
  supplierId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  supplierPicture: PropTypes.string.isRequired,
  supplierName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired
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
    const supplierStatus = navigation.getParam('supplierStatus');
    return { supplierId, supplierPicture, roomId, supplierName, supplierStatus };
  }),
  connect(mapStateToProps)
);

export default enhancer(SupplierChat);
