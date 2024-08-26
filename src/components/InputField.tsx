import { ChangeEventHandler, forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormSetContext } from './Form/form-context';
import { Container } from './Container';

type TextFieldProps = {
  validateError?: (value: unknown) => string | false;
  label: string;
} & JSX.IntrinsicElements['input'];

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const TextField = forwardRef<any, TextFieldProps>((props, ref) => {
  const setErrorMessages = useContext(FormSetContext);

  const { validateError, onChange: onChangeProp, id, value = '', label, ...inputProps } = props;
  const [validateMessage, setValidateMessage] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChangeProp?.(event);
    },
    [onChangeProp],
  );

  const runValidate = useCallback(() => {
    let message: string | false = false;
    if (validateError) {
      message = validateError(value) || '';
      setValidateMessage(message);
    }
    return message;
  }, [validateError, value]);

  const events = {
    onBlur: useCallback(() => {
      runValidate();
    }, [runValidate]),
    onFocus: useCallback(() => {
      if (validateMessage !== '') {
        setValidateMessage('');
      }
    }, [setValidateMessage, validateMessage]),
  };

  useEffect(() => {
    if (id) {
      setErrorMessages?.((prev) => {
        const map = new Map(prev);
        map.set(id, validateMessage);
        return map;
      });
    }
    return () => {
      if (id) {
        setErrorMessages?.((prev) => {
          const map = new Map(prev);
          map.delete(id);
          return map;
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMessage]);

  return (
    <Container>
      <label htmlFor={label}>
        {label} {validateMessage && <ErrorMessage>{validateMessage}</ErrorMessage>}
      </label>
      <input {...inputProps} {...events} onChange={onChange} value={value} ref={ref} key={id} />
    </Container>
  );
});
