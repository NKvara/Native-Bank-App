import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/context/ctx';
import axios from 'axios';

export interface Offer {
  id: number;
  title: string;
  text: string;
  buttonText: string;
  buttonAction: string;
  status: number;
  imageSmall: string;
  imageLarge: string;
  priority: number;
  segmentId: any;
  isDynamicSegment: boolean;
  startDate: string;
  endDate: string;
  actionType: number;
  actionValue: string;
  offerType: string;
}

export interface OfferList {
  data: Offer[];
}
const fetchOfferList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axios.get<OfferList>('/DashBoard/Offers', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const useOfferList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['Offers', session],
    queryFn: () => fetchOfferList({ session }),
  });
};
