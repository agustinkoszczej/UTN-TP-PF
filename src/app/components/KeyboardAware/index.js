import React, { Component } from 'react';
import { LayoutAnimation, Keyboard } from 'react-native';
import { isIos } from '@constants/platform';

/* eslint-disable */
// TODO define propTypes

const KeyboardAwareWrapper = WrappedComponent =>
  class KeyboardAware extends Component {
    state = { keyboardOn: false };

    keyboardWillShowSub = null;

    keyboardWillHideSub = null;

    componentDidMount() {
      this.keyboardWillShowSub = Keyboard.addListener(isIos ? 'keyboardWillShow' : 'keyboardDidShow', () =>
        this.setState({ keyboardOn: true })
      );
      this.keyboardWillHideSub = Keyboard.addListener(isIos ? 'keyboardWillHide' : 'keyboardDidHide', () =>
        this.setState({ keyboardOn: false })
      );
    }

    componentDidUpdate() {
      const { noAnimation } = this.props;
      if (noAnimation) LayoutAnimation.easeInEaseOut();
    }

    componentWillUnmount() {
      if (this.keyboardWillShowSub) this.keyboardWillShowSub.remove();
      if (this.keyboardWillHideSub) this.keyboardWillHideSub.remove();
    }

    render() {
      const { styleDuringKeyboardShow, style, children, hideOnKeyboard, ...props } = this.props;
      const { keyboardOn } = this.state;
      return (
        (!keyboardOn || !hideOnKeyboard) && (
          <WrappedComponent style={[style, keyboardOn && styleDuringKeyboardShow]} {...props}>
            {children}
          </WrappedComponent>
        )
      );
    }
  };

export default KeyboardAwareWrapper;
