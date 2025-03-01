import { Attachment } from "./attachment.interface";
import { Attribute, AttributeValue } from "./attribute.interface";
import { Category } from "./category.interface";
import { Tag } from "./tag.interface";
import { Tax } from "./tax.interface";



export interface Product {
    id: string;
    slug: string;
    name: string;
    short_description: string;
    description: string;
    name_tr: string;
    short_description_tr: string;
    description_tr: string;
    type: string;
    thumbnail: string;
    video: string;
    // product_galleries_id: [];
    galleries: string[];
    unit: string;
    weight: number;
    price: number;
    sale_price: number;
    numOfInvestors: number;
    commission: number;

    remainingQty: number;
    min_sale_units: number,
    max_sale_units: number,
    is_periodic_sale_enable: boolean,
    sale_starts_at: string,
    sale_expired_at: string,

    is_subscription_allowed: boolean,
    subscriptionStartDate: string,
    subscriptionEndDate: string,

    sku: string;
    stock_status: string;
    stock: string;
    visible_time: string;
    quantity: number;
    raised: number;
    store_id: number;
    size_chart_image_id: number;
    size_chart_image: Attachment;
    estimated_delivery_text: string;
    return_policy_text: string;
    safe_checkout: boolean;
    secure_checkout: boolean;
    social_share: boolean;
    encourage_order: boolean;
    encourage_view: boolean;
    is_free_shipping: boolean;
    is_featured: boolean;
    featured: string;
    is_trending: boolean;
    is_return: boolean;
    shipping_days: number;
    tax_id: number;
    tax: Tax;
    status: boolean;
    annual_return_rate: string;
    invest_memorandum: string;
    dividend_distribution: string;
    meta_description: string;
    product_meta_image: Attachment;
    product_meta_image_id: number;
    tags: Tag[];
    tagIds: string[];

    tag: Tag;
    categoryIds: string[];
    categories: Category[];
    category: Category;
    files: BaseMeta[];
    attributes:BaseMeta[];

    store_name: string;
    orders_count: string | number;
    order_amount: string | number;
    attribute_values: [];
    variations: Variation[];
    variants: Variant[];
    attributes_ids: number[];
    is_random_related_products: boolean;
    related_products: number[];
    cross_sell_products: number[];
    pivot?: PivotProduct;
    // created_by_id: number;
    is_approved: boolean;
    total_in_approved_products: number;
    published_at: string;
    createTime?: string;
    //     updated_at?: string;
    //     deleted_at?: string;
}

export interface BaseMeta{
    id?:string;
    productId?:string;
    key?:string;
    value?:string;
    createTime?:string;
}

export interface PivotProduct {
    order_id: number;
    product_id: number;
    quantity: number;
    shipping_cost: number;
    single_price: number;
    subtotal: number;
    variation_id?: number;
    variation: Variation;
}

export interface Variation {
    id?: number;
    name: string;
    price: number;
    sale_price: number;
    stock_status: string;
    sku: string;
    discount: number;
    quantity: number;
    variation_image: Attachment;
    variation_image_id: number;
    variation_options: VariationOption[];
    attribute_values: AttributeValue[];
    status: boolean;
}

export interface VariationOption {
    name: string;
    value: string;
}

export interface Variant {
    id: number | null;
    attribute_values: number[] | null;
    options: any;
    variant_option: any;
}

export interface VariationCombination {
    name: string;
    attribute_values: number[];
}

export interface SelectedVariant {
    id: number;
    attribute_id: number;
}

export interface CustomSelect2Product {
    label: string;
    value: string | number;
    data: ProductData;
}

export interface ProductData {
    image: string;
    name: string;
    slug: string;
    stock_status: string;
    type: string;
}
