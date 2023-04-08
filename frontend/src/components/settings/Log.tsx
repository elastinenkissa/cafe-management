import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Log as LogType } from '../../util/types/log';
import { Text } from 'react-native-paper';

interface LogProps {
  item: LogType;
}

const Log: React.FC<LogProps> = (props) => {
  return (
    <View>
      <Text style={styles.text}>{props.item.change.timestamp}</Text>
      <Text style={styles.text}>
        {props.item.change.by.name} {props.item.action}{' '}
        {props.item.orders.map((order) => order).join(', ')}{' '}
        {props.item.action.startsWith('added') ? 'to' : 'from'}{' '}
        {props.item.from} {props.item.to && `to ${props.item.to}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
});

export default Log;
