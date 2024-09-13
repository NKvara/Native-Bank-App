import { FlatList, Image, View } from 'react-native';
import React from 'react';
import PashText from '@/common/shared/PashText';
import { useOfferList } from '@/features/accounts/api/offerList';

const AccountOffers = () => {
  const offerList = useOfferList();

  if (offerList.isLoading) {
    return (
      <View>
        <View className="font-bold text-lg pl-4 h-4 w-16 rounded-md bg-pashaBgGrey" />
        <FlatList
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          className="mx-[-10px] pt-2"
          data={[{ item: 1 }, { item: 2 }]}
          renderItem={(item) => (
            <View
              key={item.index}
              className="flex-row w-80 h-28 rounded-xl bg-pashaDimGrey mx-3"
            >
              <View className="w-24 h-full rounded-md bg-pashaBgGrey" />
              <View className="w-2/3 p-4 gap-2">
                <View className="w-12 h-2 bg-pashaBgGrey rounded-sm" />
                <View className="w-24 h-4 bg-pashaBgGrey rounded-md" />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.item.toString()}
        />
      </View>
    );
  }

  if (offerList.isError) {
    return <PashText>Error</PashText>;
  }

  if (!offerList.data?.data.length) {
    return <PashText>No data</PashText>;
  }

  return (
    <View>
      <PashText className="font-bold text-lg pl-4">Offers</PashText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mx-[-10px] pt-2"
        data={offerList.data?.data}
        renderItem={({ item }) => (
          <View className="flex-row w-80 h-28 rounded-xl bg-pashaBgGrey mx-3">
            <Image
              className="w-1/3 h-full object-contain rounded-l-xl"
              source={{ uri: item.imageSmall }}
            />
            <View className="w-2/3 p-4 gap-2">
              <PashText
                className="font-bold"
                numberOfLines={2}
              >
                {item.title}
              </PashText>
              <PashText numberOfLines={2}>{item.text}</PashText>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AccountOffers;
