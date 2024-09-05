import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';

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
const fetchOfferList = async () => {
  const { data } = await axiosInstance.get<OfferList>('/DashBoard/Offers');
  return data;
};

export const useOfferList = () => {
  return useQuery({
    queryKey: ['Offers'],
    queryFn: () => fetchOfferList(),
  });
};
