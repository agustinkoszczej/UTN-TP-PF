import React, { Component } from 'react';
import { connect } from 'formik';

/**
 * This HOC enables to use components with fields from Formik
 */

/* eslint-disable */
// TODO define propTypes

const withForm = WrappedComponent => {
  class formikFormProps extends Component {
    handleChange = value => {
      debugger
      const { formik, onChange, name } = this.props;
      if (formik.handleChange) formik.handleChange(name)(value);
      if (onChange) onChange(value);
    };

    handleBlur = () => {
      const { formik, onBlur, name } = this.props;
      if (formik.handleBlur) formik.handleBlur(name);
      if (onBlur) onBlur();
    };

    render() {
      const { formik, name, error, invalid, ...props } = this.props;
      debugger
      return (
        <WrappedComponent
          {...props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          invalid={!!(formik.touched[name] && formik.errors[name]) || invalid}
          error={formik.errors[name] || error}
          value={formik.values[name]}
        />
      );
    }
  }

  return connect(formikFormProps);
};

export default withForm;
