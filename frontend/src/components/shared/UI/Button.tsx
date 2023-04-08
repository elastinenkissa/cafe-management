import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  touchOpacity: number;
  containerStyle: any;
  textStyle: any;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={props.touchOpacity}
      style={props.containerStyle}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={props.textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
