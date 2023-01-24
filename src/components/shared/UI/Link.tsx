import { NavigateFunction, useNavigate } from 'react-router-native';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface LinkProps {
  to: string;
  background: string;
  setPressed?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
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
            padding: 8,
            borderRadius: 20
          }
        ];
      }}
    >
      {props.children}
    </Pressable>
  );
};

export default Link;
