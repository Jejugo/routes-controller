const getUser = () => ({
  "id": 206946886,
  "nickname": "TETE6838590",
  "registration_date": "2016-02-24T15: 18: 42.000-04: 00",
  "first_name": "Pedro",
  "last_name": "Picapiedras",
  "country_id": "AR",
  "email": "test_user_15879541@testuser.com",
  "identification": {
    "type": "DNI",
    "number": "33333333"
  },
  "address": {
    "state": "AR-C",
    "city": "CapitalFederal",
    "address": "Triunvirato5555",
    "zip_code": "1414"
  },
  "phone": {
    "area_code": "011",
    "number": "4444-4444",
    "extension": "001",
    "verified": false
  },
  "alternative_phone": {
    "area_code": "",
    "number": "",
    "extension": ""
  },
  "user_type": "normal",
  "tags": [
    "normal",
    "test_user",
    "user_info_verified"
  ],
  "logo": null,
  "points": 100,
  "site_id": "MLA",
  "permalink": "http: //perfil.mercadolibre.com.ar/TETE6838590",
  "shipping_modes": [
    "custom",
    "not_specified"
  ],
  "seller_experience": "ADVANCED",
  "seller_reputation": {
    "level_id": null,
    "power_seller_status": null,
    "transactions": {
      "period": "historic",
      "total": 0,
      "completed": 0,
      "canceled": 0,
      "ratings": {
        "positive": 0,
        "negative": 0,
        "neutral": 0
      }
    }
  },
  "buyer_reputation": {
    "canceled_transactions": 0,
    "transactions": {
      "period": "historic",
      "total": null,
      "completed": null,
      "canceled": {
        "total": null,
        "paid": null
      },
      "unrated": {
        "total": null,
        "paid": null
      },
      "not_yet_rated": {
        "total": null,
        "paid": null,
        "units": null
      }
    },
    "tags": [

    ]
  },
  "status": {
    "site_status": "active",
    "list": {
      "allow": true,
      "codes": [

      ],
      "immediate_payment": {
        "required": false,
        "reasons": [

        ]
      }
    },
    "buy": {
      "allow": true,
      "codes": [

      ],
      "immediate_payment": {
        "required": false,
        "reasons": [

        ]
      }
    },
    "sell": {
      "allow": true,
      "codes": [

      ],
      "immediate_payment": {
        "required": false,
        "reasons": [

        ]
      }
    },
    "billing": {
      "allow": true,
      "codes": [

      ]
    },
    "mercadopago_tc_accepted": true,
    "mercadopago_account_type": "personal",
    "mercadoenvios": "not_accepted",
    "immediate_payment": false,
    "confirmed_email": false,
    "user_type": "simple_registration",
    "required_action": ""
  },
  "credit": {
    "consumed": 100,
    "credit_level_id": "MLA1"
  }
})

module.exports = {
  getUser
}