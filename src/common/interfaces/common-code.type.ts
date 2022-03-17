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

//User Authority
export enum USER_PERMISSION {
  'ADMIN_USER' = 'ADMIN_USER',
  'NORMAR_USER' = 'NORMAR_USER',
}
export const CONST_USER_PERMISSION = Object.values(USER_PERMISSION);

//Product status
export enum PRODUCT_STATUS {
  'RECRUITMENT' = 'RECRUITMENT',
  'GUARANTEE' = 'GUARANTEE',
  'TERMINATION' = 'TERMINATION',
}

//Contract status
export enum CONTRACT_STATUS {
  'NORMAR' = 'NORMAR',
  'CANCELLATION' = 'CANCELLATION',
  'CLOSE' = 'CLOSE',
}
