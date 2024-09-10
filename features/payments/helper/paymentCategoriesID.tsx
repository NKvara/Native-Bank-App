import { Entypo, Foundation, MaterialIcons } from '@expo/vector-icons';

export const paymentCategoriesID = [
  {
    paymentGroupId: 1,
    icon: (color: string) => (
      <MaterialIcons
        name="bolt"
        size={24}
        color={color}
      />
    ),
  },
  {
    paymentGroupId: 2,
    icon: (color: string) => (
      <Entypo
        name="network"
        size={24}
        color={color}
      />
    ),
  },
  {
    paymentGroupId: 3,
    icon: (color: string) => (
      <Foundation
        name="telephone"
        size={24}
        color={color}
      />
    ),
  },
  {
    paymentGroupId: 4,
    icon: (color: string) => (
      <MaterialIcons
        name="sync-problem"
        size={24}
        color={color}
      />
    ),
  },
  {
    paymentGroupId: 5,
    icon: (color: string) => (
      <Entypo
        name="shield"
        size={24}
        color={color}
      />
    ),
  },
  {
    paymentGroupId: 11,
    icon: (color: string) => (
      <MaterialIcons
        name="casino"
        size={24}
        color={color}
      />
    ),
  },
];
