import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: { margin: 15, height: '80%', justifyContent: 'space-between' }
});

export default SettingsLayout;
