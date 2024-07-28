import {View, Text, Dimensions} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import ReText from "@/components/shared/ReText";

const DashboardCards = () => {
  return (
    <View className="mx-[-1rem]">
      <View className="h-32">
        <Carousel
          loop={false}
          mode="parallax"
          width={Dimensions.get("window").width}
          height={128}
          autoPlay={false}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({index}) => (
            <View
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: 1.6,
                borderWidth: 1,
                justifyContent: "center",
                backgroundColor: "red"
              }}
            >
              <Text style={{textAlign: "center", fontSize: 30}}>{index}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DashboardCards;
