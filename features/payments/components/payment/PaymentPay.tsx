import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { paymentRouteType } from '@/features/payments/components/payment/PaymentProducts';
import { ColorPick } from '@/color-theme';
import Input from '@/common/shared/Input';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Account, usePaymentAccountList } from '@/features/payments/api/accountsList';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/accounts/helper/money';
import { getImage } from '@/features/accounts/helper/helper';
import { paymentCategoriesID } from '@/features/payments/helper/paymentCategoriesID';
import ReButton from '@/common/shared/ReButton';

interface Inputs {
  amount: number;
  accountID: number;
}

export const Card = ({ CurrentCard }: { CurrentCard?: Account }) => {
  return (
    <View className="bg-rebankBgGrey rounded-3xl">
      <Image
        source={getImage(CurrentCard?.accountType!)}
        className="h-full w-full absolute top-0 rounded-3xl"
        resizeMode="stretch"
        blurRadius={20}
      />
      <View className="flex-row p-4 justify-between">
        <View className="gap-1">
          <Text className="text-white">Card Balance</Text>
          <Text className="text-white font-bold text-xl">
            {getMoneyAmount(CurrentCard?.availableBalanceEquivalent, '-', Currency.GEL)}
          </Text>
        </View>
        <Text className="text-white font-bold">{CurrentCard?.accountIban}</Text>
      </View>
    </View>
  );
};

const PaymentPay = () => {
  const [mainCard, setMainCard] = useState<Account>({
    id: 0,
    accountIban: '',
    accountName: '',
    accountCcy: Currency.GEL,
    balance: 0,
    balanceEquivalent: 0,
    availableBalance: 0,
    availableBalanceEquivalent: 0,
    accountType: 0,
    accountSubType: null,
    accountCards: null,
  });

  const navigate = useNavigation();
  const route = useRoute<paymentRouteType>();
  const color = ColorPick();

  const rawAccounts = usePaymentAccountList();

  const { control, watch, getValues } = useForm<Inputs>({
    defaultValues: {
      amount: 0,
      accountID: 0,
    },
  });

  useEffect(() => {
    if (route.params.paymentGroupId !== 0 && !rawAccounts.isLoading) {
      setMainCard(rawAccounts.data?.data.find((obj) => obj.id === route.params.paymentAccountID) || mainCard);
    }
  }, [
    mainCard,
    rawAccounts.data?.data,
    rawAccounts.isLoading,
    route.params.paymentAccountID,
    route.params.paymentGroupId,
  ]);

  if (rawAccounts.isLoading) {
    return <ReText>Loading...</ReText>;
  }

  if (rawAccounts.isError) {
    return <ReText>Error</ReText>;
  }

  if (!rawAccounts.data?.data.length) {
    return <ReText>No data</ReText>;
  }

  watch(['amount']);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="p-4 gap-4 bg-rebankBackground h-screen">
          <ReText>From Account</ReText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigate.navigate({ name: 'Payment Accounts', params: { ...route.params }, merge: true } as never);
            }}
          >
            <Card CurrentCard={mainCard.id === 0 ? rawAccounts.data?.data[0] : mainCard} />
          </TouchableOpacity>
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
            <View className="gap-4">
              <View>
                <ReText className="text-sm opacity-70">Customer Info:</ReText>
                <ReText className="text-sm">{route.params.paymentProductCustomer}</ReText>
              </View>
              <View>
                <ReText className="text-sm opacity-70">Identifier:</ReText>
                <ReText className="text-sm">{route.params.paymentIdentifier}</ReText>
              </View>
              <View>
                <ReText className="text-sm opacity-70">Debt:</ReText>
                <Text
                  className="text-sm"
                  style={{ color: route.params.paymentProductDebt! > 0 ? '#F54F4F' : '#3ABE70' }}
                >
                  {getMoneyAmount(route.params.paymentProductDebt, '-', Currency.GEL)}
                </Text>
              </View>
              <Input
                name="amount"
                control={control}
                keyboardType="numeric"
                placeholder="Amount"
              />
              <ReButton
                name="Pay"
                disabled={
                  !getValues('amount') ||
                  getValues('amount') >
                    (mainCard.id === 0
                      ? rawAccounts.data?.data[0].availableBalanceEquivalent
                      : mainCard.availableBalance)
                }
                className="bg-rebankPrimary"
                textColor={color['--color-rebankBackground']}
                onPress={() => {
                  navigate.navigate({ name: 'Payment Success' } as never);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PaymentPay;
