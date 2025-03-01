export const settings={
    "values": {
        "general": {
            "light_logo_image_id": 3,
            "dark_logo_image_id": 4,
            "tiny_logo_image_id": 5,
            "favicon_image_id": 2,
            "site_title": "Crowdown",
            "site_tagline": "Crowdown - Product management system",
            "default_timezone": "Asia/Kolkata",
            "default_currency_id": 1,
            "admin_site_language_direction": "ltr",
            "min_order_amount": 0,
            "min_order_free_shipping": 50,
            "product_sku_prefix": "FS",
            "mode": "light-only",
            "copyright": "Copyright 2024 by Integral ways",
            "light_logo_image": {
                "id": 3,
                "collection_name": "attachment",
                "name": "logo-white",
                "file_name": "logo-white.png",
                "mime_type": "image/png",
                "disk": "public",
                "conversions_disk": "public",
                "size": "6079",
                "created_by_id": "1",
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "original_url": "assets/images/data/logo-white.png"
            },
            "dark_logo_image": {
                "id": 4,
                "collection_name": "attachment",
                "name": "logo-dark",
                "file_name": "logo-dark.png",
                "mime_type": "image/png",
                "disk": "public",
                "conversions_disk": "public",
                "size": "4997",
                "created_by_id": "1",
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "original_url": "assets/images/data/logo-dark.png"
            },
            "favicon_image": {
                "id": 2,
                "collection_name": "attachment",
                "name": "favicon",
                "file_name": "logo-dark.png",
                "mime_type": "image/png",
                "disk": "public",
                "conversions_disk": "public",
                "size": "416",
                "created_by_id": "1",
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "original_url": "assets/images/data/logo-dark.png"
            },
            "tiny_logo_image": {
                "id": 5,
                "collection_name": "attachment",
                "name": "tiny-logo",
                "file_name": "tiny-logo.png",
                "mime_type": "image/png",
                "disk": "public",
                "conversions_disk": "public",
                "size": "448",
                "created_by_id": "1",
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "original_url": "assets/images/data/logo-white.png"
            },
            "default_currency": {
                "id": 1,
                "code": "USD",
                "symbol": "USD",
                "symbol_tr":"دولار أمريكى",
                "no_of_decimal": 2,
                "exchange_rate": "1.00",
                "symbol_position": "after_price",
                "thousands_separator": "comma",
                "decimal_separator": "comma",
                "system_reserve": "1",
                "status": 1,
                "created_by_id": null,
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "deleted_at": null
            }
        },
        "activation": {
            "multivendor": true,
            "point_enable": true,
            "coupon_enable": true,
            "wallet_enable": true,
            "stock_product_hide": false,
            "store_auto_approve": true,
            "product_auto_approve": true
        },
        "wallet_points": {
            "signup_points": 100,
            "min_per_order_amount": 100,
            "point_currency_ratio": 30,
            "reward_per_order_amount": 10
        },
        "analytics": {
            "facebook_pixel": {
                "status": true,
                "pixel_id": "1354077145459856"
            },
            "google_analytics": {
                "measurement_id": "G-RB17BJ6VZB"
            }
        },
        "maintenance": {
            "title": "We'll be back Soon..",
            "maintenance_mode": false,
            "maintenance_image_id": 6,
            "description": "We are busy to updating our store for you.",
            "maintenance_image": {
                "id": 6,
                "collection_name": "attachment",
                "name": "maintainance",
                "file_name": "maintainance.jpg",
                "mime_type": "image/jpeg",
                "disk": "public",
                "conversions_disk": "public",
                "size": "111275",
                "created_by_id": "1",
                "created_at": "2023-08-24T08:16:03.000000Z",
                "updated_at": "2023-08-24T08:16:03.000000Z",
                "original_url": "assets/images/data/maintainance.jpg"
            }
        },
        "payment_methods": [
            {
                "name": "cod",
                "status": true
            },
            {
                "name": "paypal",
                "status": true
            },
            {
                "name": "stripe",
                "status": true
            },
            {
                "name": "mollie",
                "status": true
            },
            {
                "name": "razorpay",
                "status": true
            }
        ]
    }
}