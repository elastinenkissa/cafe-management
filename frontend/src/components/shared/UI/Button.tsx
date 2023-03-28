import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: string;
  touchOpacity: number;
  containerStyle: any;
  textStyle: any;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={props.touchOpacity}
      style={props.containerStyle}
      onPress={props.onPress}
    >
      <Text style={props.textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
