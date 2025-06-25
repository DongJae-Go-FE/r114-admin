export type POST_ADMIN_ADD_REQUEST_TYPE = {
  id: string;
  identification: string;
  name: string;
  team: string;
  email: string;
};

export type POST_ADMIN_PASSWORD_CHANGE_REQUEST_TYPE = {
  pw: string;
  newPw: string;
  newPwCheck: string;
};
