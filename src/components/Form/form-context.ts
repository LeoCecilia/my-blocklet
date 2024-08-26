import { createContext, useState } from 'react';

type Context = ReturnType<typeof useState<Map<string, string>>>;
const FormContext = createContext<Context[0]>(new Map<string, string>());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormSetContext = createContext<Context[1]>((_: React.SetStateAction<Map<string, string> | undefined>) => {});

export { FormContext, FormSetContext };
export default FormContext;
