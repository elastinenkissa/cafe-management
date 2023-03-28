import React from 'react';

export const useLogin = () => {
  const [name, setName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [cafeName, setCafeName] = React.useState<string>('');
  const [cafeCurrency, setCafeCurrency] = React.useState<string>('');

  return {
    name,
    username,
    password,
    cafeName,
    cafeCurrency,
    setName,
    setPassword,
    setUsername,
    setCafeCurrency,
    setCafeName
  };
};
