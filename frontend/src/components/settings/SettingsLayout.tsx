import { StyleSheet, View } from 'react-native';

interface SettingsLayoutProps {
  children: JSX.Element;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: { margin: 20, height: '80%', justifyContent: 'space-between' }
});

export default SettingsLayout;
