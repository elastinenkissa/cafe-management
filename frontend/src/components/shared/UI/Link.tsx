import React from 'react';
import {
  NavigateFunction,
  useLocation,
  useNavigate
} from 'react-router-native';
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
  pressDetectionDistance?: number;
}

const Link: React.FC<LinkProps> = (props) => {
  const redirect: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  const isActiveLink = (): boolean => {
    return pathname.startsWith(props.to);
  };

  const redirectHandler = () => {
    redirect(props.to);
  };

  return (
    <Pressable
      hitSlop={props.pressDetectionDistance || 0}
      onPress={redirectHandler}
      onPressIn={() => props.setPressed && props.setPressed(true)}
      onPressOut={() => props.setPressed && props.setPressed!(false)}
      style={({ pressed }) => {
        return [
          {
            backgroundColor: pressed ? props.background : 'transparent',
            borderRadius: 10,
            padding: 11
          },
          isActiveLink() && styles.activeLink,
          props.style
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
  },
  activeLink: {
    height: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    borderRadius: 0,
    justifyContent: 'center',
    paddingBottom: 20
  }
});

export default Link;
