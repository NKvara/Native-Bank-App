import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';
import { useSession } from '@/context/ctx';

export interface Product {
  code: string;
  name: string;
  nameLat: string;
  productId: number;
}

export interface ProductList {
  data: Product[];
}

export const fetchProductList = async ({
  paymentGroupId,
  session,
}: {
  paymentGroupId: number;
  session: string | null | undefined;
}) => {
  const { data } = await axiosInstance.get<ProductList>('/Payments/Products', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
    params: { paymentGroupId },
  });
  return data;
};

export const useProductList = (paymentGroupId: number) => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['PaymentAccounts', paymentGroupId, session],
    queryFn: () => fetchProductList({ paymentGroupId, session }),
  });
};
