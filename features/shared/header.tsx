import { TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Entypo } from '@expo/vector-icons';
import { ColorPick } from '@/color-theme';
import Constants from 'expo-constants';
import PashText from '@/common/shared/PashText';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  title,
  goBack = true,
  endAdornment,
}: {
  title: string;
  goBack?: boolean;
  endAdornment?: ReactNode;
}) => {
  const color = ColorPick();
  const statusBarHeight = Constants.statusBarHeight;
  const navigate = useNavigation();

  return (
    <View
      className="bg-pashaBgGrey pb-2 border-b-2 border-b-pashaDimGrey"
      style={{ paddingTop: statusBarHeight }}
    >
      <View className="flex-row justify-between items-center h-12 px-4">
        <View>
          {goBack && (
            <TouchableOpacity onPress={() => navigate.goBack}>
              <View className="bg-pashaBgGrey rounded-full justify-center items-center">
                <Entypo
                  name="chevron-left"
                  size={24}
                  color={color['--color-pashaPrimary']}
                />
              </View>
            </TouchableOpacity>
          )}
          <PashText className="font-bold capitalize text-lg">{title}</PashText>
        </View>
        {endAdornment ? <View>{endAdornment}</View> : <View />}
      </View>
    </View>
  );
};

export default Header;
