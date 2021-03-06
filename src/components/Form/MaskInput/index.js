/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { InputMask, Label, Error } from './styles';

export default function MaskInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.value = value;
      },
      clearValue(ref) {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Label htmlFor={fieldName}>
      <strong>{label}</strong>
      <InputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error>{error}</Error>}
    </Label>
  );
}

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
};
