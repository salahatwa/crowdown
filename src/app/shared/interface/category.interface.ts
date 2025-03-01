import { Attachment } from "./attachment.interface";


export interface Category {
    id: string;
    name: string;
    name_tr: string;
    slug: string;
    description: string;
    type: string;
    thumbnail: string;
    parentId?: string;
    category_image?: Attachment;
    category_image_id?: number;
    category_icon?: Attachment;
    category_icon_id?: number;
    commission_rate?: number;
    children?: Category[];
    status: boolean;
    createTime?: string;
}