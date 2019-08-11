import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { ScrollView, View, ViewPropTypes } from 'react-native';
import CustomButton from '@components/CustomButton';

import BackgroundImage from './components/BackgroundImage';
import styles from './styles';

class BaseForm extends Component {
  state = { isOnTop: false };

  sectionsThreshold = 5;

  componentDidUpdate(prevProps, prevState) {
    const { isOnTop } = this.state;
    const { navigation } = this.props;
    if (prevState.isOnTop !== isOnTop) {
      navigation.setParams({ overflowHeader: !isOnTop });
    }
  }

  handleScroll = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }) => {
    const { isOnTop } = this.state;
    if (y <= this.sectionsThreshold) {
      if (!isOnTop) {
        this.setState({ isOnTop: true });
      }
    } else if (isOnTop) {
      this.setState({ isOnTop: false });
    }
  };

  render() {
    const {
      children,
      buttonTitle,
      style,
      onSubmit,
      buttonDisabled,
      primaryBtn,
      showButton,
      buttonStyle,
      scrolleable,
      buttonLeftComponent,
      buttonRightComponent,
      bottomFixedComponent,
      customStyle,
      backgroundStyle,
      backgroundColor,
      uri,
      pictures,
      thumbnail,
      sizeImage,
      priority,
      icon,
      defaultImage,
      textStyle,
      ...buttonProps
    } = this.props;
    const Container = scrolleable ? ScrollView : View;
    const containerStyle = [primaryBtn && showButton && styles.primaryContainer, style];
    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
        <Container
          style={[!scrolleable && [styles.contentContainer, containerStyle], customStyle]}
          contentContainerStyle={[styles.contentContainer, scrolleable && containerStyle]}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
        >
          <BackgroundImage
            uri={uri}
            pictures={pictures}
            thumbnail={thumbnail}
            sizeImage={sizeImage}
            defaultImage={defaultImage}
            priority={priority}
            icon={icon}
            style={backgroundStyle}
            backgroundColor={backgroundColor}
          />
          {children}
          {showButton && (
            <CustomButton
              primaryBtn={primaryBtn}
              disabled={buttonDisabled}
              onPress={onSubmit}
              title={buttonTitle}
              style={[styles.button, !primaryBtn && styles.footerBtn, buttonStyle]}
              rightComponent={buttonRightComponent}
              textStyle={textStyle}
              {...buttonProps}
            />
          )}
        </Container>
        {!!bottomFixedComponent && <View style={styles.bottomFixed}>{bottomFixedComponent}</View>}
      </SafeAreaView>
    );
  }
}

BaseForm.defaultProps = {
  buttonTitle: 'Confirmar'
};

BaseForm.propTypes = {
  buttonTitle: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  showButton: PropTypes.bool,
  buttonStyle: ViewPropTypes.style,
  customStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  primaryBtn: PropTypes.bool,
  onSubmit: PropTypes.func,
  buttonLeftComponent: PropTypes.node,
  buttonRightComponent: PropTypes.node,
  scrolleable: PropTypes.bool,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired
  }).isRequired,
  defaultImage: PropTypes.number,
  backgroundStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
  uri: PropTypes.string,
  priority: PropTypes.string,
  icon: PropTypes.bool,
  bottomFixedComponent: PropTypes.node,
  thumbnail: PropTypes.bool,
  sizeImage: PropTypes.string
};

export default withNavigation(BaseForm);
