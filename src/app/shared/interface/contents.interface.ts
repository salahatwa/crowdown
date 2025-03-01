

export interface PageContent {
    id: string;
    title: string;
    title_tr: string;
    slug: string;
    content: string;
    content_tr: string;
    status: boolean;
    system: boolean;
    meta_title: string;
    meta_description: string;
    page_meta_image: string;
    createTime?: string;
    updateTime?: string;
}


export interface FileContent {
    id: string;
    title: string;
    title_tr: string;
    slug: string;
    code: string;

    status: boolean;
    system: boolean;

    url: string;
    createTime?: string;
    updateTime?: string;
}


export interface DyTemplate {
    id: string;
    name: string;
    type: string;
    content: string;
    slug: string;
    status: boolean;
    createTime?: string;
    updateTime?: string;
}