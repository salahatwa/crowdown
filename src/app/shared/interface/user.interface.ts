import { PaginateModel } from "./core.interface";
import { Role } from "./role.interface";
import { Country } from "./country.interface";
import { States } from "./state.interface";
import { Attachment } from "./attachment.interface";
import { Wallet } from "./wallet.interface";
import { Point } from "./point.interface";
import { PaymentDetails } from "./payment-details.interface";

//user
export interface User {
    user?: User;
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    image?: string;
    active: boolean;
    accessToken: string;
    refreshToken: string;
    roles?: string[];
    permissions?: string[];
    payment_account: PaymentDetails;
    role_id: number;
    role_name?: string;
    // roles?: Role;
    address?: UserAddress[];
    point?: Point;
    wallet?: Wallet;
    is_approved: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface UserAddress {
    id: number;
    user_id: number;
    title: string;
    street: string;
    type: string;
    city: string;
    pincode: string | number;
    state_id: number;
    state: States;
    country_code: number;
    country: Country;
    phone: number;
    country_id: number;
    is_default: boolean;
}