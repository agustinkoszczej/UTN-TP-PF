import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatActions from '@redux/chat/actions';
import CustomTextInput from '@components/CustomTextInput';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import waveIcon from '@assets/wave.png';

import styles from './styles';

class ChatList extends Component {
  state = { name: '' };

  handleTextSubmit = () => {
    const { rooms } = this.props;
    const { name } = this.state;
    this.setState({ rooms: rooms.users.filter(user => user.name.indexOf(name) > -1) });
  };

  handleInputChange = name => this.setState({ name });

  selectSupplier = ({ id: user_id, name, avatar_url, room_id }) => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.SupplierChat, { user_id, name, avatar_url, room_id });
  };

  renderItem = ({ item }) => {
    const { userId } = this.props;
    const {
      customData: { nameByUser }
    } = item;
    const supplierId = Object.keys(nameByUser).filter(id => id !== userId)[0];
    const supplierName = nameByUser[supplierId];
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <View style={styles.item}>
          <Image
            source={{ uri: 'http://www.facetheforce.today/random/400?r=1' }}
            style={styles.supplierPicture}
          />
          <CustomText bold>{`${supplierName}`}</CustomText>
          <Image style={styles.wave} source={waveIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ room_id: id }) => `${id}`;

  render() {
    const { name } = this.state;
    const { rooms, loading } = this.props;

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
          <FlatList data={rooms} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
        )}
      </View>
    );
  }
}

ChatList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  rooms: state.chat.rooms,
  loading: state.chat.pusherManagerLoading,
  userId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(ChatList);
