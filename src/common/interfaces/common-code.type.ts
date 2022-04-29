//Cryptocurrency code
export enum CRYPTOCURRENCY_SYMBOL {
  'RIPPLE' = 'XRP',
  'KLAYTN' = 'KLAY',
  'TETHER' = 'USDT',
}

//Email type
export enum EMAIL_TYPE {
  'SIGNIN' = 'SIGNIN',
  'EMAIL_AUTHENTICATION' = 'EMAIL_AUTHENTICATION',
  'WITHDRAWAL' = 'WITHDRAWAL',
}

//User Roles
export enum USER_ROLES {
  'NORMAL_USER' = 'NORMAL_USER',
}
export const CONST_USER_ROLES = Object.values(USER_ROLES);

//Admin Roles
export enum ADMIN_ROLES {
  'NORMAL_ADMIN' = 'NORMAL_ADMIN',
  'SUPER_ADMIN' = 'SUPER_ADMIN',
}
export const CONST_ADMIN_ROLES = Object.values(ADMIN_ROLES);

//Product status
export enum PRODUCT_STATUS {
  'RECRUITMENT' = 'RECRUITMENT',
  'GUARANTEE' = 'GUARANTEE',
  'TERMINATION' = 'TERMINATION',
}

//Contract status
export enum CONTRACT_STATUS {
  'PREPARATION' = 'PREPARATION',
  'NORMAL' = 'NORMAL',
  'CANCELLATION' = 'CANCELLATION',
  'CLOSE' = 'CLOSE',
}
