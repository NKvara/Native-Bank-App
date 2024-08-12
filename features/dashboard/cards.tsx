import { View, Dimensions, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { cards } from '@/features/dashboard/helper';
import ReText from '@/common/shared/ReText';
import { getMoneyAmount } from '@/features/dashboard/money';
import { FontAwesome } from '@expo/vector-icons';

const DashboardCards = () => {
  const carouselRef = useRef<ICarouselInstance>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {}, [currentIndex]);

  return (
    <View className="mx-[-1rem]">
      <View className="items-center justify-center h-48">
        <Carousel
          ref={carouselRef}
          loop={false}
          mode="parallax"
          modeConfig={{ parallaxScrollingOffset: 120 }}
          width={Dimensions.get('window').width + 64}
          autoPlay={false}
          data={[...cards]}
          onProgressChange={(_, e) => {
            setCurrentIndex(e);
          }}
          scrollAnimationDuration={400}
          renderItem={({ item }) => (
            <View>
              <Image
                source={item.Image}
                className="h-full w-full absolute top-0 rounded-2xl"
                resizeMode="stretch"
                blurRadius={20}
              />
              <View className="h-full flex-row justify-between p-4">
                <View className="justify-between">
                  <ReText className="text-white font-bold text-xl">{item.Title}</ReText>
                  <ReText className="text-white font-bold text-3xl">
                    {getMoneyAmount(item.Balance, '-', item.Currency)}
                  </ReText>
                </View>
                <View className="justify-between items-end">
                  <ReText className="text-white font-bold text-lg">
                    ** {item.Credit_Card_Number.substring(item.Credit_Card_Number.length - 4)}
                  </ReText>
                  <FontAwesome
                    name={item.Issuer}
                    size={32}
                    color="white"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View className="flex-row justify-center gap-2">
        {cards.map((e, i) => {
          return (
            <View
              key={e.Credit_Card_Number}
              className="rounded-full bg-rebankDimGrey w-2 h-2 overflow-hidden"
            >
              <View
                className="rounded-full h-full w-full bg-rebankYellow"
                style={{ transform: `translateX(${((currentIndex - i)*12)}px)` }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default DashboardCards;
