import { verify } from 'jsonwebtoken';

interface ITokenData {
  iat: number,
  exp: number,
  sub: string,
  user: {
    balance: number,
    username: string
  }
}

export const getTokenData = (token: string | undefined) => {
  if (token) {
    const _token = token.replace('Bearer', '').trim();

    const _tokenData = verify(_token, '33779428-f03f-4f4f-929d-b1db7d8441d0');

    return JSON.stringify(_tokenData)

  }
  return JSON.stringify({})
}

export const getUserDataFromToken = (token: string | undefined) => {
  const _tokenData: ITokenData = JSON.parse(getTokenData(token))

  if (_tokenData) {
    return _tokenData.user
  }

  return null
}

export const formatDate = (date: string) => {
  const _date = new Date(date)

  const dateFormatted = _date.toLocaleString('pt-BR')
  return dateFormatted

}

export const formatCurrency = (_currency: number) => {

  const currencyFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(_currency)

  return currencyFormatted

}