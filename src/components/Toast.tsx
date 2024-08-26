import { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import type { ReactElement } from 'react';

const generateComponent = function generateComponent(ele: ReactElement) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = ReactDOM.createRoot(container);
  root.render(ele);
  return () => {
    root.unmount();
    container.remove();
  };
};

const Toast = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  transform: translate(0, 50%);
  left: 50%;
  background: #ff00003d;
  padding: 5px 10px;
  border-radius: 4px;
`;

/** Toast is based on alert component */
export const useToast = function useToast({ interval }: { interval: number }) {
  const ref = useRef<any>();

  const toast = useCallback(
    (message: any) => {
      if (!ref.current) {
        ref.current = generateComponent(<Toast>{message}</Toast>);

        setTimeout(() => {
          ref.current();
          ref.current = null;
        }, interval);
      }
    },
    [interval],
  );

  return toast;
};
