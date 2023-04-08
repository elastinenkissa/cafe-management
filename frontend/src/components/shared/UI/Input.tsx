import React from 'react';
import { TextInput } from 'react-native-paper';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  style?: object;
  isPassword?: boolean;
  number?: boolean;
  error?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const [wasTouched, setWasTouched] = React.useState<boolean>(false);

  return (
    <TextInput
      secureTextEntry={props.isPassword}
      placeholder={props.placeholder}
      onBlur={() => setWasTouched(true)}
      onFocus={() => setWasTouched(false)}
      value={props.value}
      onChangeText={props.onChange}
      style={props.style}
      error={props.error || (wasTouched && props.value.length === 0)}
      keyboardType={props.number ? 'numeric' : 'default'}
    />
  );
};

export default Input;
