import { Link as RouterLink } from 'react-router-native';
import { StyleSheet, Text } from 'react-native';

interface LinkProps {
  to: string;
  children: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <RouterLink to={props.to}>
      <Text style={styles.link}>{props.children}</Text>
    </RouterLink>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'white',
    fontSize: 20
  }
});

export default Link;
