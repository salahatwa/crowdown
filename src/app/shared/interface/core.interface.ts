
export interface ApiRs<T> {
    message?: string;
    requestTime?: string;
    data?: T;
}

export interface Page<T> {
    content?: T[];
    pageable?: Pageable;
    totalElements?: number;
    totalPages?: number;
    size?: number;
}

export interface Pageable {
    pageNumber?: number;
    pageSize?: number;
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: string;
    to?: number;
    totalElements?: number;
    totalPages?: number;
}


export interface Params {
    [key: string]: any;
}

export interface PaginateModel {
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: string;
    to?: number;
    total?: number;
}

export interface Link {
    active?: number;
    label?: string;
    url?: string;
}
