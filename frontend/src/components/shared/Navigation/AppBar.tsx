import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocation } from 'react-router-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Link from '../UI/Link';

const AppBar: React.FC = () => {
  const { pathname } = useLocation();

  const styles = StyleSheet.create({
    container: {
      height: 100,
      display: pathname === '/' ? 'none' : 'flex',
      backgroundColor: '#20232a',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      elevation: 10
    }
  });

  return (
    <>
      <StatusBar backgroundColor="transparent" style="light" />
      <View style={styles.container}>
        <Link
          to="/cafe"
          background="transparent"
          text="Cafe"
          pressDetectionDistance={30}
        />
        <Link
          to="/outside"
          background="transparent"
          text="Deptors"
          pressDetectionDistance={30}
        />
        <Link
          to="/options"
          background="transparent"
          text="Options"
          pressDetectionDistance={30}
        />
      </View>
    </>
  );
};

export default AppBar;
