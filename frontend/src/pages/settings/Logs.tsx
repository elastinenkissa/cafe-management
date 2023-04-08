import React from 'react';
import { FlatList } from 'react-native';
import axios, { CancelTokenSource } from 'axios';

import SettingsLayout from '../../components/settings/SettingsLayout';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import Log from '../../components/settings/Log';

import { Log as LogType } from '../../util/types/log';

import { api } from '../../util/services/api';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

const Logs: React.FC = () => {
  const [logs, setLogs] = React.useState<Array<LogType>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchLogs = async (cancelToken: CancelTokenSource) => {
    try {
      const response = await api.get<Array<LogType>>('/logs', {
        params: {
          cafe: user!.cafe.id
        },
        cancelToken: cancelToken.token
      });

      setLogs(response.data);
    } catch (error) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetchLogs(source);

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <SettingsLayout>
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        data={logs}
        renderItem={({ item }) => <Log key={item.id} item={item} />}
      />
    </SettingsLayout>
  );
};

export default Logs;
