import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from './styles';

class Collapsible extends Component {
  state = { expanded: new Animated.Value(0), maxHeight: 0, measuring: true, animating: false };

  componentDidUpdate(prevProps, prevState) {
    const { collapsed } = this.props;
    const { measuring } = this.state;
    const collapsing = prevProps.collapsed !== collapsed;
    const measure = prevState.measuring !== measuring;
    if (collapsing || measure) {
      this.changeLayout(measure, collapsing);
    }
  }

  changeLayout = (measuring, collapsing) => {
    const { expanded, maxHeight } = this.state;
    const { collapsed, collapseCallback, expandCallback } = this.props;
    const expand = !collapsed && (measuring || collapsing);
    if (maxHeight)
      this.setState({ animating: true }, () => {
        Animated.timing(expanded, {
          toValue: expand ? maxHeight : 0,
          easing: Easing.bezier(0.15, 0, 0.25, 1)
        }).start(() => {
          if (expand) expandCallback();
          else collapseCallback();
          this.setState({ animating: false });
        });
      });
  };

  handleLayout = e => {
    const {
      nativeEvent: {
        layout: { height }
      }
    } = e;
    const { expanded, measuring, animating } = this.state;
    const { collapsed } = this.props;
    if (measuring) this.setState({ measuring: false, maxHeight: height });
    else if (!collapsed && !animating) {
      expanded.setValue(height);
      this.setState({ maxHeight: height });
    }
  };

  render() {
    const { children, style, collapsed } = this.props;
    const { expanded, measuring, animating } = this.state;
    return (
      <Animated.View
        style={[
          measuring
            ? styles.measure
            : (collapsed || animating) && {
                height: expanded
              },
          styles.container,
          style
        ]}
        onLayout={this.handleLayout}
      >
        {children}
      </Animated.View>
    );
  }
}

Collapsible.propTypes = {
  collapsed: PropTypes.bool,
  collapseCallback: PropTypes.func,
  expandCallback: PropTypes.func
};

Collapsible.defaultProps = {
  collapseCallback: () => {},
  expandCallback: () => {}
};

export default Collapsible;
