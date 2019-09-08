import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, ViewPropTypes } from 'react-native';
import CustomModal from '@components/CustomModal';
import CustomText from '@components/CustomText';
import SeparatorWithText from '@components/SeparatorWithText';
import { black } from '@constants/colors';

import dropdownIcon from './assets/ic_angle_down_grey.png';
import styles, { MAX_ITEMS } from './styles';
import DropdownItem from './components/DropdownItem';

class CustomDropdown extends Component {
  state = {
    visible: false
  };

  listRef = React.createRef();

  handleOnPress = item => {
    const { onSelectItem } = this.props;
    this.handleCloseModal();
    onSelectItem(item);
  };

  handleOpenModal = () => {
    const { items } = this.props;
    this.setState(
      () => ({ visible: true }),
      () => {
        if (items.length >= MAX_ITEMS) {
          setTimeout(() => this.listRef.current.flashScrollIndicators(), 300);
        }
      }
    );
  };

  handleCloseModal = () => this.setState({ visible: false });

  renderDropdownItem = ({ item }) => {
    const { itemNameSelector } = this.props;
    return <DropdownItem item={item} itemNameSelector={itemNameSelector} onPress={this.handleOnPress} />;
  };

  renderDropdownSeparator = () => <SeparatorWithText separatorStyle={{ backgroundColor: black }} />;

  handleKey = item => `${item.id}`;

  render() {
    const { items, style, textStyle, selectedOption, closeOnOverlayPress, leftIcon } = this.props;
    const { visible } = this.state;
    return (
      <>
        <TouchableOpacity style={[styles.container, style]} onPress={this.handleOpenModal}>
          <View style={styles.optionWrapper}>
            {!!leftIcon && <Image source={leftIcon} resizeMode="contain" style={styles.icon} />}
            <CustomText selector borderless style={textStyle}>
              {selectedOption}
            </CustomText>
          </View>
          <Image source={dropdownIcon} resizeMode="contain" style={styles.buttonIcon} />
        </TouchableOpacity>
        <CustomModal
          visible={visible}
          onRequestClose={this.handleCloseModal}
          closeOnOverlayPress={closeOnOverlayPress}
        >
          <FlatList
            ref={this.listRef}
            data={items}
            renderItem={this.renderDropdownItem}
            ItemSeparatorComponent={this.renderDropdownSeparator}
            onEndThreshold={0}
            keyExtractor={this.handleKey}
            contentContainerStyle={styles.modalContent}
            style={styles.modalContainer}
          />
        </CustomModal>
      </>
    );
  }
}

CustomDropdown.defaultProps = {
  itemNameSelector: item => item.name || item.title
};

CustomDropdown.propTypes = {
  selectedOption: PropTypes.string,
  textStyle: Text.propTypes.style,
  style: ViewPropTypes.style,
  onSelectItem: PropTypes.func.isRequired,
  itemNameSelector: PropTypes.func,
  closeOnOverlayPress: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  leftIcon: PropTypes.number
};

export default CustomDropdown;
