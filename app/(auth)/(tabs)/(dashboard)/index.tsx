import Accounts from '@/features/accounts';
import Deposits from '@/features/deposits/components';
import Loans from '@/features/loans';
import { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import ReText from '@/common/shared/ReText';
import { ColorPick } from '@/color-theme';
import DashboardHeader from '@/features/shared/header';

enum Pages {
  accounts = 'accounts',
  loans = 'loans',
  deposits = 'deposits',
}

const Component = ({ currPage }: { currPage: Pages }) => {
  switch (currPage) {
    case Pages.accounts:
      return <Accounts />;
    case Pages.loans:
      return <Loans />;
    case Pages.deposits:
      return <Deposits />;
    default:
      return <Accounts />;
  }
};

export default function DashboardScreen() {
  const [currPage, setCurrPage] = useState(Pages.accounts);
  const PageSelectArray = Object.values(Pages);
  const color = ColorPick();

  return (
    <View className="bg-rebankBackground h-screen">
      <DashboardHeader />
      <ScrollView className="px-4 pt-4">
        <View className="flex-row justify-between pb-4 gap-4">
          {PageSelectArray.map((o, i) => (
            <TouchableOpacity
              className="flex flex-row flex-1"
              activeOpacity={0.8}
              key={i}
              onPress={() => setCurrPage(o)}
            >
              <View
                style={{
                  backgroundColor:
                    currPage === o ? color['--color-rebankBrightPurple'] : color['--color-rebankDimGrey'],
                }}
                className="w-full p-3 rounded-3xl"
              >
                <ReText className="font-bold capitalize text-center">{o}</ReText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Component currPage={currPage} />
      </ScrollView>
    </View>
  );
}
