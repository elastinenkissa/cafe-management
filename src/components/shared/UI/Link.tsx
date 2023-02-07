import { NavigateFunction, useNavigate } from 'react-router-native';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle
} from 'react-native';

interface LinkProps {
  to: string;
  background: string;
  setPressed?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  text?: string;
  children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = (props) => {
  const redirect: NavigateFunction = useNavigate();

  const redirectHandler = () => {
    redirect(props.to);
  };

  return (
    <Pressable
      onPress={redirectHandler}
      onPressIn={() => props.setPressed && props.setPressed(true)}
      onPressOut={() => props.setPressed && props.setPressed!(false)}
      style={({ pressed }) => {
        return [
          props.style,
          {
            backgroundColor: pressed ? props.background : 'transparent',
            padding: 11,
            borderRadius: 15
          }
        ];
      }}
    >
      {props.text && <Text style={styles.text}>{props.text}</Text>}
      {props.children && props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20
  }
});

export default Link;
