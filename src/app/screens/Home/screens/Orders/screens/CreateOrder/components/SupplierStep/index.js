import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthActions from '@redux/auth/actions';
import CustomTextInput from '@components/CustomTextInput';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class SupplierStep extends Component {
  state = { name: '' };

  componentDidMount() {
    const { getAgenda } = this.props;
    getAgenda();
  }

  handleTextSubmit = () => {
    const { getAgenda } = this.props;
    const { name } = this.state;
    getAgenda(name);
  };

  handleInputChange = name => this.setState({ name });

  selectSupplier = ({ fullName, user_id: id, picture, companyName, name }) => () => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.SUPPLIER_ID, id);
    setFieldValue(CREATE_ORDER_FIELDS.RECEIVER_NAME, fullName || name);
    setFieldValue(CREATE_ORDER_FIELDS.SUPPLIER_PICTURE, picture);
    setFieldValue(CREATE_ORDER_FIELDS.COMPANY_NAME, companyName);
  };

  renderItem = ({ item }) => {
    const { fullName, picture, companyName, name } = item;
    return (
      <TouchableOpacity style={styles.supplierContainer} onPress={this.selectSupplier(item)}>
        <View style={{ flexDirection: 'column' }}>
          <Image source={{ uri: picture }} style={styles.supplierPicture} />
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', width: 250 }}>
          <CustomText bold textProps={{ numberOfLines: 1 }}>
            {fullName || name}
          </CustomText>
          <CustomText textProps={{ numberOfLines: 1 }}>{`(${companyName})`}</CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = ({ user_id: userId }) => `${userId}`;

  render() {
    const { name } = this.state;
    const { agenda, values, loading } = this.props;
    const picture = values[CREATE_ORDER_FIELDS.SUPPLIER_PICTURE];
    const companyName = values[CREATE_ORDER_FIELDS.COMPANY_NAME];
    const fullName = values[CREATE_ORDER_FIELDS.RECEIVER_NAME];
    return (
      <View style={styles.container}>
        {picture && (
          <View style={styles.valueSelected}>
            <View style={{ flexDirection: 'column' }}>
              <Image source={{ uri: picture }} style={styles.supplierPicture} />
            </View>
            <View
              style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', width: 250 }}
            >
              <CustomText bold textProps={{ numberOfLines: 1 }}>
                {fullName || name}
              </CustomText>
              <CustomText textProps={{ numberOfLines: 1 }}>{`(${companyName})`}</CustomText>
            </View>
          </View>
        )}
        <View style={styles.header}>
          <CustomTextInput
            placeholder="Distribuidor"
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
          <FlatList data={agenda} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
        )}
      </View>
    );
  }
}

SupplierStep.propTypes = {
  getAgenda: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.SUPPLIER_ID]: PropTypes.string
  }),
  agenda: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  agenda: state.auth.agenda?.users || [],
  loading: state.auth.agendaLoading
});

const mapDispatchToProps = dispatch => ({
  getAgenda: string => dispatch(AuthActions.getAgenda(string))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierStep);
