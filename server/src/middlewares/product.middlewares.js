import { validate } from '../utils/validation.js'

export const AccessoriesValidator = validate(
  checkSchema(
    { 
      description: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMPTY_DESCRIPTION
        },
      },
      price: {
        notEmpty: {
            errorMessage: USERS_MESSAGES.EMPTY_PRICE
          },
      },
      photo: {
        notEmpty: {
            errorMessage: USERS_MESSAGES.EMPTY_PHOTO
          },
      }
    },
    ['body']
  )
)

export const TradeProductValidator = validate(
    checkSchema(
      {
        description: {
          notEmpty: {
            errorMessage: USERS_MESSAGES.EMPTY_DESCRIPTION
          },
        },
        price: {
          notEmpty: {
              errorMessage: USERS_MESSAGES.EMPTY_PRICE
            },
        },
        photo: {
          notEmpty: {
              errorMessage: USERS_MESSAGES.EMPTY_PHOTO
            },
        }
      },
      ['body']
    )
  )

