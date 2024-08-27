import Dashboard from '@/features/dashboard';
import Deposits from '@/features/deposits';
import Loans from '@/features/loans';
import { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import DashboardHeader from '@/features/dashboard/header';
import ReText from '@/common/shared/ReText';
import { ColorPick } from '@/color-theme';

enum Pages {
  dashboard = 'dashboard',
  loans = 'loans',
  deposits = 'deposits',
}

const Component = ({ currPage }: { currPage: Pages }) => {
  switch (currPage) {
    case Pages.dashboard:
      return <Dashboard />;
    case Pages.loans:
      return <Loans />;
    case Pages.deposits:
      return <Deposits />;
    default:
      return <Dashboard />;
  }
};

export default function DashboardScreen() {
  const [currPage, setCurrPage] = useState(Pages.dashboard);
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
