export interface Customer {
    id: string,
    name: string,
    email: number,
    identity: string,
    status: boolean,
    created_by_id: number;
    createTime?: string;
    country_code?: string;
    mobile?: string;
    type?: ConsumerType;
}

type ConsumerType = 'base' | 'channel'; 