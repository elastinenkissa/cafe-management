import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';

const AddNewButton: React.FC = () => {
  return (
    <View>
      <Pressable style={styles.new}>
        <Text style={styles.plus}>＋</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  new: {
    backgroundColor: '#ffa0b0',
    width: 50,
    height: 50,
    borderRadius: 100,
    textAlign: 'center'
  },
  plus: {
    fontSize: 35,
    color: 'white'
  }
});

export default AddNewButton;
