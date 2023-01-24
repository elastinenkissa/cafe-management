import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface AddNewProps {
  onPress: () => void;
}

const AddNewButton: React.FC<AddNewProps> = (props) => {
  return (
    <Pressable style={styles.new} onPress={props.onPress}>
      <Text style={styles.plus}>＋</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  new: {
    backgroundColor: '#ffa0b0',
    width: 50,
    height: 50,
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center'
  },
  plus: {
    fontSize: 45,
    color: 'white'
  }
});

export default AddNewButton;
