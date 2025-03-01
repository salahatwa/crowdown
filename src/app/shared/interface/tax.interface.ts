export interface Tax {
    id: string,
    name: string,
    rate: number,
    country_id: number,
    state_id: number,
    pincode: number,
    city: string,
    status: boolean,
    created_by_id: number;
    createTime?: string;
    updated_at?: string;
    deleted_at?: string;
}