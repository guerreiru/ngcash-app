interface ITokenData {
  token: string
  refreshToken: {
    id: string,
    expiresIn: number,
    userId: string
  }
}

export const checkTokenIsValid = async (token: string): Promise<boolean> => {
  if (token) {
    const _tokenData: ITokenData = await JSON.parse(token)
    const tokenExpiresIn = _tokenData.refreshToken.expiresIn * 1000
    const isTokenValid = tokenExpiresIn - new Date().getTime()

    return !!isTokenValid
  }
  return false
}