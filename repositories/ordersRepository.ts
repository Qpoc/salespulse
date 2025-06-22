import { useApi } from "~/utils/api";

interface Order {
  id: number;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

export const useOrdersRepository = () => {
  const api = useApi();

  return {
    getRecentOrders: async (limit: number = 10) => {
      return await api.get<Order[]>("/v1/orders/recent", { limit });
    },

    getOrders: async (options: any) => {
      return await api.get<Order[]>("/v1/orders", options);
    },
  };
};
