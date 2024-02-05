const ENDPOINTS = {
  PROPERTY: {
    FAVORITE: '/user/favorites/add/',
    UNFAVORITE: '/user/favorites/remove/',
    RETRIEVE: '/properties/',
    SPECIFIC: '/property/',
    GET_FAVORITES: '/user/favorites/',
    RECOMMENDED: '/user/recommendations/',
    SEARCH: '/custom_filter/',
    MARK_FOR_SALE: 'property/mark_for_sale/',
    UNMARK_FROM_SALE: 'property/unmark_for_sale/',
    GET_CREATED_PROPERTIES: '/user/user_added_properties/',
    GET_OWNED_PROPERTIES: 'user/user_owned_properties/',
    VERIFY_OWNERSHIP: 'property/verify_ownership/',
    REQUEST_OWNERSHIP: 'property/request_ownership/',
    DROP_OWNERSHIP: 'property/drop_ownership/',
    TRANSFER_OWNERSHIP: '/property/transfer_ownership/',
    IMAGES: {
      ADD: '/property/upload_image/',
      REMOVE: '/property/remove_image/',
    },
    UPDATE: '/property/update/details/',
    ADD: '/property/add/',
  },
  USER: {
    RETRIEVE: '/users/',
    PROFILE: '/user/profile/',
    EDIT_PROFILE: '/user/profile/update/details/',
    EDIT_PASSWORD: '/user/profile/change/password/',
    VERIFY_EMAIL: '/resend_verification_email/',
    EDIT_EMAIL: 'user/profile/change/email/',
    AUTHENTICATION: {
      STANDARD: {
        SIGNUP: '/user/signup/standard/',
        LOGIN: '/user/token/standard/',
      },
      OAUTH: {
        SIGNUP: '/user/signup/oauth/',
        LOGIN: '/user/token/oauth/',
      },
      TOKEN: {
        REFRESH: '/user/token/refresh/',
      },
    },
  },
  APP: {
    URL: 'com.realcomparison',
  },
};

export default ENDPOINTS;
