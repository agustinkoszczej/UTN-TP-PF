import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomTextInput from '@components/CustomTextInput';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import waveIcon from '@assets/wave.png';

import styles from './styles';

class Chats extends Component {
  static getDerivedStateFromProps({ rooms }, { loaded }) {
    if (!loaded && !!rooms.length) {
      return { rooms, loaded: true };
    }
    return null;
  }

  state = { rooms: [], loaded: false }; // eslint-disable-line

  handleTextSubmit = () => {};

  handleInputChange = name => {
    const { rooms, userId } = this.props;
    const filterRooms = rooms.filter(({ customData }) => {
      const supplierId = Object.keys(customData.nameByUser).filter(id => id !== userId)[0];
      return customData.nameByUser[supplierId].includes(name);
    });
    this.setState({ rooms: filterRooms });
  };

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
    const { rooms } = this.state;
    const { loading } = this.props;
    debugger;
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
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  rooms: state.chat.rooms,
  loading: state.chat.pusherConnectionLoading,
  userId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(Chats);
