import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';

export interface Debt {
  status: number;
  statusDescription: string;
  data: {
    debt: number;
    abonentInfo: string;
  };
}

const fetchDebtVerify = async ({
  session,
  productId,
  paymentIdentifier,
}: {
  session: string | null | undefined;
  productId: string;
  paymentIdentifier: string;
}) => {
  const { data } = await axiosInstance.get<Debt>('/Payments/DeptVerify', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
    params: { productId, paymentIdentifier },
  });
  return data;
};

export const useDebtVerify = () => {
  return useMutation({
    mutationFn: fetchDebtVerify,
  });
};
