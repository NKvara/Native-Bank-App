import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { paymentRouteType } from '@/features/payments/components/payment/PaymentProducts';
import ReText from '@/common/shared/ReText';
import { paymentCategoriesID } from '@/features/payments/helper/paymentCategoriesID';
import { ColorPick } from '@/color-theme';
import Input from '@/common/shared/Input';
import { useForm } from 'react-hook-form';
import ReButton from '@/common/shared/ReButton';
import { useDebtVerify } from '@/features/payments/api/debtVerify';
import { useSession } from '@/context/ctx';
import { getMoneyAmount, Currency } from '@/features/accounts/helper/money';

interface Inputs {
  identifier: string;
  info: string;
  debt: number;
}

const PaymentVerify = () => {
  const navigate = useNavigation();
  const route = useRoute<paymentRouteType>();
  const color = ColorPick();
  const { session } = useSession();

  const { control, watch, getValues, setValue } = useForm<Inputs>({
    defaultValues: {
      identifier: '',
      info: '',
      debt: -1,
    },
  });

  const debtVerify = useDebtVerify();

  watch(['identifier', 'debt', 'info']);
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
              editable={getValues('debt') < 0}
              id="identifier"
              placeholder="Identifier"
              keyboardType="default"
            />
            {!!getValues('info') && (
              <View className="gap-4">
                <View>
                  <ReText className="text-sm opacity-70">Customer Info:</ReText>
                  <ReText className="text-sm">{getValues('info')}</ReText>
                </View>
                <View>
                  <ReText className="text-sm opacity-70">Debt:</ReText>
                  <Text
                    className="text-sm"
                    style={{ color: getValues('debt') > 0 ? '#F54F4F' : '#3ABE70' }}
                  >
                    {getMoneyAmount(getValues('debt'), '-', Currency.GEL)}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <ReButton
            name={'Next'}
            className="bg-rebankPrimary"
            disabled={debtVerify.isPending || !getValues('identifier')}
            textColor={color['--color-rebankBackground']}
            onPress={() => {
              if (getValues('debt') < 0) {
                debtVerify.mutate(
                  {
                    session,
                    paymentIdentifier: getValues('identifier'),
                    productId: route.params.paymentProductId!,
                  },
                  {
                    onSuccess: (o) => {
                      if (o.data !== null) {
                        setValue('debt', o.data.debt);
                        setValue('info', o.data.abonentInfo);
                      }
                    },
                  }
                );
              } else {
                navigate.navigate({
                  name: 'Payment Pay',
                  params: {
                    ...route.params,
                    paymentProductCustomer: getValues('info'),
                    paymentProductDebt: getValues('debt'),
                    paymentProductAccountID: 0,
                    paymentIdentifier: getValues('identifier'),
                  },
                } as never);
              }
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PaymentVerify;
