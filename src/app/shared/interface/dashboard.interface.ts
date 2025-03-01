export interface StatisticsCount {
    total_revenue: number;
    total_consumers: number;
    total_orders: number;
    total_users: number;
    total_products: number;
    total_categories: number;
    total_refunds: number;
    total_withdraw_requests: number;
}

export interface RevenueChart {
    revenues: number[];
    commissions: number[];
    months: string[];
}