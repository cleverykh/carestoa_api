//Exchange code
export enum EXCHANGE_CODE {
  'OKBIT' = 'OKB',
  'WOWPAX' = 'WOW',
  'GDAC' = 'GDA',
  'KORBIT' = 'KOR',
  'COREDAX' = 'COR',
  'COINBIT' = 'COI',
  'COINNCOIN' = 'COC',
  'COINONE' = 'COO',
  'TENNTEN' = 'TEN',
  'FOBLGATE' = 'FOB',
  'PRAVANG' = 'PRA',
  'PROBIT' = 'PRO',
  'FLYBIT' = 'FLY',
  'FLATA' = 'FLA',
  'HANBITCO' = 'HAN',
  'HUOBI' = 'HUO',
}

//Cryptocurrency code
export enum CRYPTOCURRENCY_CODE {
  'RIPPLE' = 'XRP',
  'KLAYSWAP' = 'KSP',
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
