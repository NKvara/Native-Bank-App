import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { paymentRouteType } from '@/features/transfer/components/payment/PaymentProducts';
import PashText from '@/common/shared/PashText';
import { paymentCategoriesID } from '@/features/transfer/helper/paymentCategoriesID';
import { ColorPick } from '@/color-theme';
import Input from '@/common/shared/Input';
import { useForm } from 'react-hook-form';
import PashButton from '@/common/shared/PashButton';
import { useDebtVerify } from '@/features/transfer/api/debtVerify';
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
        <View className="p-4 gap-4 bg-pashaBackground h-screen">
          <View className="bg-pashaBgGrey p-4 rounded-2xl gap-4">
            <View className="flex-row gap-4 py-2 h-20">
              <View className="h-full aspect-square justify-center items-center bg-pashaDimGrey rounded-full">
                {paymentCategoriesID[route.params.paymentGroupIconIndex!].icon(color['--color-pashaPrimary'])}
              </View>
              <View className="justify-around">
                <PashText
                  numberOfLines={2}
                  className="font-bold"
                >
                  {route.params.paymentProductTitle}
                </PashText>
                <PashText className="text-sm text-pashaGrey">{route.params.paymentGroupTitle}</PashText>
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
                  <PashText className="text-sm opacity-70">Customer Info:</PashText>
                  <PashText className="text-sm">{getValues('info')}</PashText>
                </View>
                <View>
                  <PashText className="text-sm opacity-70">Debt:</PashText>
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
          <PashButton
            name={'Next'}
            className="bg-pashaPrimary"
            disabled={debtVerify.isPending || !getValues('identifier')}
            textColor={color['--color-pashaBackground']}
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
