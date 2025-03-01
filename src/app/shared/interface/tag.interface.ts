
export interface Tag {
    id: string;
    name: string;
    name_tr: string;
    icon: string;
    slug: string;
    description?: string;
    type: string;
    status: boolean;
    createTime?: string;
    updated_at?: string;
    deleted_at?: string;
}