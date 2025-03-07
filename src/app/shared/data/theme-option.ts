import { Select2Data } from "ng-select2-component";

export const language_direction: Select2Data = [
    {
        value: 'rtl',
        label: 'RTL',
    },
    {
        value: 'ltr',
        label: 'LTR',
    }
]

export const footer_mode: Select2Data = [
    {
        value: 'light_mode',
        label: 'Footer Light',
    },
    {
        value: 'dark_mode',
        label: 'Footer Dark',
    }
]

export const frames_layout = [
    {
        // width: 600,
        // height: 600,
        frameOptions: {
            style: undefined,
            label: 'None',
            image: 'assets/images/theme-option/shop/10.jpg',
        }
    },
    {
        width: 600,
        height: 600,
        frameOptions: {
            style: 'FE_046',
            height: 250,
            width: 190,
            x: 345,
            y: 310,
            label: 'Collection category slider',
            image: 'assets/images/theme-option/shop/10.jpg',
            containers: [{
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                stroke: '#4caf50'
            }, {
                fill: '#4caf50'
            }],
            contents: [{
                fill: '#FFF',
                stroke: '#4caf50'
            }]
        }
    },
    {
        width: 200,
        height: 200,
        frameOptions: {
            style: 'FE_020',
            height: 400,
            width: 325,
            x: 88,
            y: 410,
            background: '#ffffff',
            label: 'Collection category slider',
            image: 'assets/images/theme-option/shop/10.jpg',

            texts: [{
                textContent: 'Create 2022',
                fill: '#4d4d4d',
                x: '31%',
                y: '58%',
                fontSize: '15pt',
                fontFamily: 'cursive',

            }, {
                textContent: 'Author: DaiDH',
                fill: '#4d4d4d',
                x: '29%',
                y: '90%',
                fontSize: '15pt',
                fontFamily: 'cursive'
            }]
        }
    },
    {
        width: 90,
        height: 90,
        frameOptions: {
            style: 'FE_002',
            height: 410,
            width: 335,
            x: 5,
            y: 23,
            containers: [{
                fill: '#F04A24'
            }],
            label: 'Collection Category Sidebar',
            image: 'assets/images/theme-option/shop/11.jpg',
            texts: []
        }
    },
    {
        width: 90,
        height: 90,
        frameOptions: {
            style: 'FE_003',
            height: 410,
            width: 335,
            x: 5,
            y: 23,
            containers: [{
                fill: '#F04A24'
            }],
            label: 'Collection Category Sidebar',
            image: 'assets/images/theme-option/shop/11.jpg',
            texts: []
        }
    },
    {
        width: 90,
        height: 90,
        frameOptions: {
            style: 'FE_004',
            height: 410,
            width: 335,
            x: 5,
            y: 23,
            containers: [{
                fill: '#F04A24'
            }],
            label: 'Collection Category Sidebar',
            image: 'assets/images/theme-option/shop/11.jpg',
            texts: []
        }
    }
]

export const collection_layout = [
    {
        value: 'collection_category_slider',
        label: 'Collection category slider',
        image: 'assets/images/theme-option/shop/10.jpg'
    },
    {
        value: 'collection_category_sidebar',
        label: 'Collection Category Sidebar',
        image: 'assets/images/theme-option/shop/11.jpg'
    },
    {
        value: 'collection_banner',
        label: 'Collection Banner',
        image: 'assets/images/theme-option/shop/03.jpg'
    },
    {
        value: 'collection_left_sidebar',
        label: 'Collection Left Sidebar',
        image: 'assets/images/theme-option/shop/04.jpg'
    },
    {
        value: 'collection_list',
        label: 'Collection List',
        image: 'assets/images/theme-option/shop/05.jpg'
    },
    {
        value: 'collection_right_sidebar',
        label: 'Collection Right Sidebar',
        image: 'assets/images/theme-option/shop/06.jpg'
    },
    {
        value: 'collection_offcanvas_filter',
        label: 'Collection Offcanvas Filter',
        image: 'assets/images/theme-option/shop/07.jpg'
    },
]

export const product_layout = [
    {
        value: 'product_images',
        label: 'Product Image',
        image: 'assets/images/theme-option/product/01.jpg'
    },
    {
        value: 'product_thumbnail',
        label: 'Product thumbnail',
        image: 'assets/images/theme-option/product/02.jpg'
    },
    {
        value: 'product_slider',
        label: 'Product Slider',
        image: 'assets/images/theme-option/product/04.jpg'
    },
    {
        value: 'product_sticky',
        label: 'Product Sticky',
        image: 'assets/images/theme-option/product/07.jpg'
    },
    {
        value: 'product_tabs',
        label: 'Product Tabs',
        image: 'assets/images/theme-option/product/08.jpg'
    },
    {
        value: 'product_accordion',
        label: 'Product Accordion',
        image: 'assets/images/theme-option/product/09.jpg'
    }
]

export const useful_link = [
    {
        id: 1,
        value: 'home',
        name: 'Home',
    },
    {
        id: 2,
        value: 'collections',
        name: 'Collections',
    },
    {
        id: 3,
        value: 'about-us',
        name: 'About Us',
    },
    {
        id: 4,
        value: 'blogs',
        name: 'Blogs',
    },
    {
        id: 5,
        value: 'offers',
        name: 'Offers',
    },
    {
        id: 6,
        value: 'search',
        name: 'Search',
    },
]

export const help_center = [
    {
        id: 1,
        name: "My Account",
        value: "account/dashboard"
    },
    {
        id: 2,
        name: "My Orders",
        value: "account/order"
    },
    {
        id: 3,
        name: "Wishlist",
        value: "wishlist"
    },
    {
        id: 4,
        name: "Compare",
        value: "compare"
    },
    {
        id: 5,
        name: "FAQs",
        value: "faq"
    },
    {
        id: 6,
        name: "Contact Us",
        value: "contact-us"
    }
]

export const blog_sidebar_type = [
    {
        value: 'left_sidebar',
        label: 'Left Sidebar',
        image: 'assets/images/theme-option/shop/01.jpg'

    },
    {
        value: 'right_sidebar',
        label: 'Right Sidebar',
        image: 'assets/images/theme-option/shop/08.jpg'
    },
    {
        value: 'no_sidebar',
        label: 'No Sidebar',
        image: 'assets/images/theme-option/shop/09.jpg'
    },
]