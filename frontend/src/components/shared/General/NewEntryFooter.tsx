import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import AddNewButton from '../UI/AddNewButton';

import { EntryType } from './PageView';

import {
  UserContext,
  UserContextType
} from '../../../util/context/UserContext';

interface NewEntryFooterProps extends EntryType {
  onPress: () => void;
  onTransfer: () => void;
  pathname: string;
}

const NewEntryFooter: React.FC<NewEntryFooterProps> = (props) => {
  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    total: {
      fontSize: 18,
      opacity:
        props.pathname.startsWith('/cafe') ||
        props.pathname.startsWith('/outside/')
          ? 1
          : 0,
      color: 'white'
    },
    transferButton: {
      opacity:
        props.pathname.startsWith('/cafe') ||
        props.pathname.startsWith('/outside/')
          ? 1
          : 0
    }
  });

  const { user } = React.useContext<UserContextType>(UserContext);

  return (
    <View>
      <View style={styles.transferButton}>
        <TouchableOpacity onPress={props.onTransfer}>
          <Button textColor="grey">Transfer to deptor</Button>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>
          Total:{' '}
          {props.entries?.reduce(
            (accumulator, current) => accumulator + current.price,
            0
          ) || 0}{' '}
          {user?.cafe.currency}
        </Text>
        <AddNewButton onAdd={props.onPress} />
      </View>
    </View>
  );
};

export default NewEntryFooter;
