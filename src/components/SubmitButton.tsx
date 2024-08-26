import { useContext, useEffect, useState } from 'react';
import { FormContext } from './Form/form-context';
import { Button } from './Button';

type SubmitButtonProps = {
  text?: string;
};

export const SubmitButton = (props: SubmitButtonProps) => {
  const { text = 'Submit' } = props;
  const errorMessages = useContext(FormContext);

  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    let disabled = false;
    if (errorMessages) {
      for (const [, errorMessage] of errorMessages.entries()) {
        if (errorMessage) {
          disabled = true;
        }
      }
    }
    setIsDisabled(disabled);
  }, [errorMessages]);

  return (
    <Button type="submit" disabled={isDisabled}>
      {text}
    </Button>
  );
};
