import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatActions from '@redux/chat/actions';
import CustomTextInput from '@components/CustomTextInput';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import waveIcon from '@assets/wave.png'

import styles from './styles';
import reactotron from 'reactotron-react-native';

import { ReactotronImpl } from 'reactotron-core-client';

class ChatList extends Component {
  state = { name: '', rooms: [] };

  componentDidMount() {
    reactotron.log(this.state);
    reactotron.log(this.props);
    const { getPusherManager, userId } = this.props
    getPusherManager(userId).catch(err => { console.log(err) }); //TODO: unhandled promise rejection

    // const { pusherManager } = this.props

    // pusherManager ?.rooms.forEach(room =>
    //   pusherManager.subscribeToRoomMultipart({
    //     roomId: room.id,
    //     hooks: {
    //       onUserStartedTyping: (room, user) => {
    //         //TODO:
    //       },
    //       onUserStoppedTyping: (room, user) => {
    //         //TODO
    //       }
    //     }
    //   })
    // )
    //   .catch(err => {
    //     console.log(err);
    //   })
    // this.setState({ rooms: pusherManager ?.rooms });
  };

  handleTextSubmit = () => {
    const { pusherManager } = this.props;
    const { name } = this.state;
    this.setState({ rooms: pusherManager.rooms.users.filter(user => user.name.indexOf(name) > -1) })
  };

  handleInputChange = name => this.setState({ name });

  selectSupplier = ({ id: user_id, name, avatar_url, room_id }) => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.SupplierChat, { user_id, name, avatar_url, room_id });
  };

  renderItem = ({ item }) => {
    const { userId } = this.props
    const { member_user_ids, custom_data, id: room_id, avatar_url, unreadCount } = item;
    const supplierId = first(member_user_ids.filter(ids => ids != userId))
    const supplierName = custom_data.nameByUser.supplierId
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <View style={styles.item}>
          <Image source={{ uri: 'http://www.facetheforce.today/random/400?r=1' }} style={styles.supplierPicture} />
          <CustomText bold>{`${supplierName}`}</CustomText>
          <Image style={styles.wave} source={waveIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ room_id: id }) => `${id}`;

  render() {
    const { name } = this.state;
    const { pusherManager, loading } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomTextInput
            placeholder="Contacto"
            style={styles.formElement}
            autoCapitalize="words"
            returnKeyType="go"
            onTextSubmitEditing={this.handleTextSubmit}
            underline
            onChange={this.handleInputChange}
            value={name}
          />
          <CustomButton
            primaryBtn
            textStyle={styles.white}
            onPress={this.handleTextSubmit}
            title="Buscar"
            style={styles.search}
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
            <FlatList data={pusherManager ?.rooms} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
          )}
      </View>
    );
  }
}

ChatList.propTypes = {
  getPusherManager: PropTypes.func.isRequired,
  pusherManager: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  pusherManager: state.chat.pusherManager,
  loading: state.chat.pusherManagerLoading,
  userId: state.auth.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  getPusherManager: userId => dispatch(ChatActions.getPusherManager(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
