export interface AuthUserStateModel {
  email: string;
  password: string;
}

export interface AuthUserForgotModel {
  email: string;
}

export interface VerifyEmailOtpModel {
  email: string;
  code: string;
}

export interface UpdatePasswordModel {
  password: string;
  password_confirmation: string;
  email: string;
  code: string;
}
