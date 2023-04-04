import React from 'react';

import ConfirmingButton from '../shared/UI/ConfirmingButton';

interface LoginButtonProps {
  loginType: string;
  onLogin: () => void;
  valid: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  return (
    <ConfirmingButton onPress={props.onLogin} valid={props.valid} style={{width: 350}}>
      {props.loginType}
    </ConfirmingButton>
  );
};

export default LoginButton;
