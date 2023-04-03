import { View } from 'react-native';

import SettingsLayout from '../../components/settings/SettingsLayout';
import Link from '../../components/shared/UI/Link';

const ManageCafe: React.FC = () => {
  return (
    <SettingsLayout>
      <View>
        <Link to="/options/manage/tables" text="Tables" background="black" />
        <Link to="/options/manage/menu" text="Menu" background="black" />
      </View>
    </SettingsLayout>
  );
};

export default ManageCafe;
