import { View, ImageBackground } from 'react-native';
import React from 'react';
import { DepositList } from '@/features/deposits/api/getList';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/accounts/helper/money';

const Card = ({ productName, ccy, amount }: DepositList) => {
  return (
    <View>
      <ImageBackground
        source={require('@/assets/images/accounts/cards/1.png')}
        resizeMode="cover"
        className="w-full h-[130px] rounded-3xl p-4  overflow-hidden mb-4 flex justify-between"
      >
        <ReText className="text-white font-bold text-sx">{productName}</ReText>
        <ReText className="text-white font-bold text-3xl">
          {getMoneyAmount(amount, '-', Currency[ccy as keyof typeof Currency])}
        </ReText>
      </ImageBackground>
    </View>
  );
};

export default Card;
