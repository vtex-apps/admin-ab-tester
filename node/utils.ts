import { AuthenticationError, ForbiddenError, UserInputError } from '@vtex/api'
import { AxiosError } from 'axios'

export const BUCKET_NAME = 'product-translation'
export const ALL_TRANSLATIONS_FILES = 'all-translations'

export const statusToError = (e: AxiosError) => {
  if (!e.response) {
    throw e
  }

  const {
    response: { status },
  } = e

  switch (status) {
    case 401: {
      throw new AuthenticationError(e)
    }

    case 403: {
      throw new ForbiddenError(e)
    }

    case 400: {
      throw new UserInputError(e)
    }

    default:
      throw new TypeError(e.message)
  }
}

export const MAX_PRODUCTS_PER_CATEGORY = 50
