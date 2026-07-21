import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const WithReactHookForm = ({ children }) => {
  const methods = useForm();
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { formMethods: methods });
        }
        return child;
      })}
    </>
  );
};

export default WithReactHookForm;

