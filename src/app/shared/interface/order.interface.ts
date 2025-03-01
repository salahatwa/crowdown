import { Customer } from "./customer.interface";
import { Product } from "./product.interface";
// import { Stores } from "./store.interface";


export interface Order {
    consumer_name: string;
    order_id: string;
    order_payment_method:string;
    order_order_status:string;

    id: string;
    consumer: Customer;
    products: Product[];
    order_status: string;
    // payment_status: string;

    payment_method: string;
    payment_mode: string;


    orderItems: OrderItem[];
    total_tax: number;
    total_commission:number;
    total: number;
    subtotal: number;
    createTime?: string;
    additionalInfo?:Map<string,string>;
}

export interface OrderItem {
    id?: string;
    quantity?: number;
    product?: Product;
    sub_total?: number;
    total?: number;
    distributions?:Distribution[];
}

export interface Distribution {
    date:string;
    amount:number;
    profit:number;
}
export interface OrderCheckout {
    total: CheckoutTotal | null;
}

export interface CheckoutTotal {
    convert_point_amount: number;
    convert_wallet_balance: number;
    coupon_total_discount: number;
    points: number;
    points_amount: number;
    shipping_total: number;
    sub_total: number;
    tax_total: number;
    total: number;
    wallet_balance: number;
}

export interface CheckoutPayload {
    consumer: Customer;
    orderItems: OrderProduct[];
    payment_method?: string;
}

export interface OrderProduct {
    product_id: number;
    quantity: number;
}
