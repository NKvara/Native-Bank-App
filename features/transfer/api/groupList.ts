import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';
import { useSession } from '@/context/ctx';

export interface Group {
  paymentGroupId: number;
  description: string;
  descriptionLat: string;
}

export interface GroupList {
  data: Group[];
}
const fetchGroupList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axiosInstance.get<GroupList>('/Payments/Groups', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const useGroupList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['PaymentGroups', session],
    queryFn: () => fetchGroupList({ session }),
  });
};
