
export interface Role {
  id: string;
  name: string;
  guard_name?: string;
  createTime?: string;
  updateTime?: string;
  isChecked: boolean;
  permissions?: Permission[];
}


export interface Permission {
  id: string;
  name: string;
  isChecked?: boolean;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}
