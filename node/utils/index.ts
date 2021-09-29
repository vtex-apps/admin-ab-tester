import { IOContext } from '@vtex/api'

export const getAuthToken = (ctx: IOContext) => {
  if (ctx.storeUserAuthToken) {
    return ctx.storeUserAuthToken
  }

  if (ctx.adminUserAuthToken) {
    return ctx.adminUserAuthToken
  }

  return ctx.authToken
}

export const fixedRules = [
  1,
  1129,
  5226,
  957,
  2026,
  2995,
  5166,
  4972,
  1564,
  1565,
  1592,
  1593,
  1677,
  1558,
  51,
  1685,
  46,
  1644,
  43149,
  6692,
  6859,
  44481,
  44482,
]
