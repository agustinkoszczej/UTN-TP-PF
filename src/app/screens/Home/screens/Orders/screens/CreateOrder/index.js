import React, { Component } from 'react';
import { View } from 'react-native';
import CustomDropdown from '@components/CustomDropdown';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

class CreateOrderContainer extends Component {
  state = { selectedOption: PAYMENT_METHODS[0].text };

  handleSelectItem = item => this.setState({ selectedOption: item.text });

  nameSelector = item => item.text;

  render() {
    const { selectedOption } = this.state;
    return (
      <View>
        <CustomDropdown
          selectedOption={selectedOption}
          onSelectItem={this.handleSelectItem}
          items={PAYMENT_METHODS}
          itemNameSelector={this.nameSelector}
          closeOnOverlayPress
        />
      </View>
    );
  }
}

export default CreateOrderContainer;
