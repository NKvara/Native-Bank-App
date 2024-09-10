import { View, Dimensions, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/accounts/helper/money';
import { FontAwesome } from '@expo/vector-icons';
import { getAccounts, getSummedAmount } from '@/common/helper/getAccounts';
import { useAccountList } from '@/features/accounts/api/accountList';
import { ColorPick } from '@/color-theme';
import { getImage } from '@/features/accounts/helper/helper';

const AccountCards = () => {
  const color = ColorPick();

  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {}, [currentIndex]);

  const rawAccounts = useAccountList();

  const accounts = getAccounts(rawAccounts.data?.data);
  const sum = getSummedAmount(rawAccounts.data?.data);

  if (rawAccounts.isLoading) {
    return (
      <View className="gap-4 items-center w-full">
        <ReText className="opacity-70">Total Balance</ReText>
        <View className="w-44 h-6 rounded-md bg-rebankBgGrey" />
        <View className="h-44 w-full  rounded-2xl bg-rebankBgGrey" />
      </View>
    );
  }

  if (rawAccounts.isError) {
    return <ReText>Error</ReText>;
  }

  return (
    <View className="gap-4">
      <View className="justify-center items-center gap-1">
        <ReText className="opacity-70">Total Balance</ReText>
        <ReText className="font-bold text-4xl">{getMoneyAmount(sum, '-', Currency.GEL)}</ReText>
      </View>
      <View className="items-center justify-center h-44">
        <Carousel
          ref={carouselRef}
          loop={false}
          mode="parallax"
          modeConfig={{ parallaxScrollingOffset: 38, parallaxScrollingScale: 0.92 }}
          width={Dimensions.get('window').width}
          autoPlay={false}
          data={[...accounts]}
          onProgressChange={(_, e) => {
            setCurrentIndex(e);
          }}
          scrollAnimationDuration={400}
          renderItem={({ item }) => (
            <View>
              <Image
                // TODO images
                source={getImage(item.mainAccount.accountType)}
                className="h-full w-full absolute top-0 rounded-2xl"
                resizeMode="stretch"
                blurRadius={20}
              />
              <View className="h-full flex-row justify-between p-4">
                <View className="justify-between">
                  <ReText className="text-white font-bold text-xl">{item.mainAccount.accountName}</ReText>
                  <ReText className="text-white font-bold text-3xl">
                    {getMoneyAmount(item.summedAmount, '-', Currency.GEL)}
                  </ReText>
                </View>
                <View className="justify-between items-end">
                  <View>
                    {item.mainAccount.accountCards && (
                      <ReText className="text-white font-bold text-lg">
                        **{' '}
                        {item.mainAccount.accountCards[0].cardNumber.substring(
                          item.mainAccount.accountCards[0].cardNumber.length - 4
                        )}
                      </ReText>
                    )}
                  </View>
                  <View>
                    {item.mainAccount.accountType === 200 && (
                      <FontAwesome
                        name={'cc-visa'}
                        size={32}
                        color="white"
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View className="flex-row justify-center gap-2">
        {accounts.map((e, i) => {
          return (
            <View
              key={e.mainAccount.accountIban}
              className="rounded-full bg-rebankDimGrey w-2 h-2 overflow-hidden"
            >
              <View
                className="rounded-full h-full w-full"
                style={{
                  transform: `translateX(${(currentIndex - i) * 12}px)`,
                  backgroundColor:
                    e.mainAccount.accountType === 200 ? color['--color-rebankYellow'] : color['--color-rebankPurple'],
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AccountCards;