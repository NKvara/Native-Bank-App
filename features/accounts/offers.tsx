import { FlatList, Image, View } from 'react-native';
import React from 'react';
import ReText from '@/common/shared/ReText';
import { useOfferList } from '@/features/accounts/api/offerList';

const AccountOffers = () => {
  const offerList = useOfferList();

  if (offerList.isLoading) {
    return <ReText>Loading...</ReText>;
  }

  if (offerList.isError) {
    return <ReText>Error</ReText>;
  }

  if (!offerList.data?.data.length) {
    return <ReText>No data</ReText>;
  }

  return (
    <View>
      <ReText className="font-bold text-lg pl-4">Offers</ReText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mx-[-10px] pt-2"
        data={offerList.data?.data}
        renderItem={({ item }) => (
          <View className="flex-row w-80 h-28 rounded-xl bg-rebankBgGrey mx-3">
            <Image
              className="w-1/3 h-full object-contain rounded-l-xl"
              source={{ uri: item.imageSmall }}
            />
            <View className="w-2/3 p-4 gap-2">
              <ReText
                className="font-bold"
                numberOfLines={2}
              >
                {item.title}
              </ReText>
              <ReText numberOfLines={2}>{item.text}</ReText>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AccountOffers;
