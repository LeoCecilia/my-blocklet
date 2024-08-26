import { FC, FormEvent, useCallback, useState } from 'react';
import { FormContext, FormSetContext } from './form-context';

const Form: FC<JSX.IntrinsicElements['form']> = (props) => {
  const { children, onSubmit } = props;
  const [errorMessages, setErrorMessages] = useState<Map<string, string> | undefined>(new Map<string, string>());

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit],
  );

  return (
    <FormContext.Provider value={errorMessages}>
      <FormSetContext.Provider value={setErrorMessages}>
        <form onSubmit={handleSubmit}>{children}</form>
      </FormSetContext.Provider>
    </FormContext.Provider>
  );
};

export { Form };
