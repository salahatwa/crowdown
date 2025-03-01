import { PaginateModel } from "./core.interface";

// export interface NotificationModel extends PaginateModel {
//     data: Notification[];
// }

export interface Notification {
    id: string;
    logKey:string;
    event: string;
    content: string;
    ipAddress:string;
    read_at?: string;
    createTime?: string;
    updated_at?: string;
    deleted_at?: string;
}