//거래소 코드
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

//가상화폐 코드
export enum CRYPTOCURRENCY_CODE {
  'RIPPLE' = 'XRP',
  'KLAYSWAP' = 'KSP',
}

//사용자권한
export enum USER_PERMISSION {
  'ADMIN_USER' = 'ADMIN_USER',
  'NORMAR_USER' = 'NORMAR_USER',
}
export const CONST_USER_PERMISSION = Object.values(USER_PERMISSION);
