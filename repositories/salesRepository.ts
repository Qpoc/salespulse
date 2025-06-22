import { useApi } from "~/utils/api";

interface SalesSummary {
  total_sales: number;
  total_revenue: number;
  average_sale_value: number;
  most_popular_variant: {
    variant: any;
    quantity: number;
  };
  top_category: string;
}

interface TopProduct {
  id: number;
  name: string;
  sold: number;
  revenue: number;
}

export const useSalesRepository = () => {
  const api = useApi();

  return {
    getSummary: async () => {
      return await api.get<SalesSummary>("/v1/sales/summary");
    },

    getTopProducts: async (limit: number = 5) => {
      return await api.get<TopProduct[]>("/v1/sales/top-products", { limit });
    },

    getTopVariants: async (limit: number = 4) => {
      return await api.get<any[]>("/v1/sales/top-variants", { limit });
    },

    getRevenueOverTime: async (limit: number = 10) => {
      return await api.get<any[]>("/v1/sales/revenue-over-time", { limit });
    },
  };
};
