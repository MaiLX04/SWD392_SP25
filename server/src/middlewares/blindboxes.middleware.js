import { checkSchema } from 'express-validator';
import { validate } from '../utils/validation.js';
import { BLINDBOX_MESSAGES } from '../constants/messages.js';

const nameSchema = {
  notEmpty: {
    errorMessage: BLINDBOX_MESSAGES.NAME_IS_REQUIRED,
  },
  isString: {
    errorMessage: BLINDBOX_MESSAGES.NAME_MUST_BE_A_STRING,
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100,
    },
    errorMessage: BLINDBOX_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
  },
};

const imageSchema = {
  notEmpty: {
    errorMessage: BLINDBOX_MESSAGES.IMAGE_IS_REQUIRED,
  },
  isURL: {
    errorMessage: BLINDBOX_MESSAGES.IMAGE_MUST_BE_A_VALID_URL,
  },
};

const descriptionSchema = {
  notEmpty: {
    errorMessage: BLINDBOX_MESSAGES.DESCRIPTION_IS_REQUIRED,
  },
  isString: {
    errorMessage: BLINDBOX_MESSAGES.DESCRIPTION_MUST_BE_A_STRING,
  },
  trim: true,
};

export const createBlindBoxValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      image: imageSchema,
      description: descriptionSchema,
    },
    ['body']
  )
);