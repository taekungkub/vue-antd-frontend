export interface UserTy {
  id: number;
  is_verify: Boolean;
  reset_password_token: string;
  role_id: number;
  role_title: string;
  user_created: string;
  user_displayname: string;
  user_email: string;
  user_id: number;
  user_password: string;
  user_tel: string;
  user_updated: string;
}

export interface FormAddUserTy {
  user_email: string;
  user_password: string;
  user_confirm_password: string;
  user_displayname: string;
  user_tel: string;
  is_verify: boolean;
  role_id: string;
}
