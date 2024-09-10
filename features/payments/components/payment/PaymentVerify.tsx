import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { paymentRouteType } from '@/features/payments/components/payment/PaymentProducts';
import ReText from '@/common/shared/ReText';
import { paymentCategoriesID } from '@/features/payments/helper/paymentCategoriesID';
import { ColorPick } from '@/color-theme';
import Input from '@/common/shared/Input';
import { useForm } from 'react-hook-form';
import ReButton from '@/common/shared/ReButton';

interface Inputs {
  identifier: string;
}

const PaymentVerify = () => {
  const route = useRoute<paymentRouteType>();
  const color = ColorPick();

  const { control, watch } = useForm<Inputs>({
    defaultValues: {
      identifier: '',
    },
  });

  watch(['identifier']);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="p-4 gap-4 bg-rebankBackground h-screen">
          <View className="bg-rebankBgGrey p-4 rounded-2xl gap-4">
            <View className="flex-row gap-4 py-2 h-20">
              <View className="h-full aspect-square justify-center items-center bg-rebankDimGrey rounded-full">
                {paymentCategoriesID[route.params.paymentGroupIconIndex!].icon(color['--color-rebankPrimary'])}
              </View>
              <View className="justify-around">
                <ReText
                  numberOfLines={2}
                  className="font-bold"
                >
                  {route.params.paymentProductTitle}
                </ReText>
                <ReText className="text-sm text-rebankGrey">{route.params.paymentGroupTitle}</ReText>
              </View>
            </View>
            <Input
              name="identifier"
              control={control}
              id="identifier"
              placeholder="Identifier"
              keyboardType="default"
            />
          </View>
          <ReButton
            name="Check"
            className="bg-rebankPrimary"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PaymentVerify;
