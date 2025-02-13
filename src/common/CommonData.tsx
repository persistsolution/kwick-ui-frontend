import { Link } from "react-router-dom";
import ALLImages from "./ImageData";

export interface headerCartType {
    id: number;
    itemName: string;
    preview: string;
    ulElement: JSX.Element;
    price: string;
}

export const HeaderCart: headerCartType[] = [
    { id: 1, preview: ALLImages('product1'), itemName: 'SomeThing Phone', price: '$1,299.00', ulElement: (<ul className="header-product-item"> <li>Quantity: 1</li> <li>Size: XL</li> </ul>) },
    { id: 2, preview: ALLImages('product2'), itemName: 'Stop Watch', price: '$179.29', ulElement: (<ul className="header-product-item"><li>Quantity: 2</li><li>Size: L</li></ul>) },
    { id: 3, preview: ALLImages('product1'), itemName: 'Photo Frame', price: '$29.00', ulElement: (<ul className="header-product-item"><li>Quantity: 5</li><li>Size: M</li></ul>) },
    { id: 4, preview: ALLImages('product5'), itemName: 'Kikon Camera', price: '$4,999.00', ulElement: (<ul className="header-product-item"><li>Quantity: 2</li><li>Size: XXL</li></ul>) },
    { id: 5, preview: ALLImages('product11'), itemName: 'Canvas Shoes', price: '$129.00', ulElement: (<ul className="header-product-item"> <li>Quantity: 4</li> <li>Size: XS</li> </ul>) },
]


export interface cartdataType {
    id: number;
    previewIcon: JSX.Element;
    item2: any;
    divElement: JSX.Element
}

export const cartData: cartdataType[] = [
    {
        id: 1, previewIcon: <span className="avatar avatar-md bg-primary rounded-circle"><i className="ti ti-gift fs-18"></i></span>, item2: "", divElement: (<div> <Link to={`${import.meta.env.BASE_URL}Pages/NotificationList/`} className="mb-0 fs-13 font-weight-semibold text-dark">Nile Robetz send to a HTML file for Upload</Link><div className="p-1 text-warning"> <span className="fs-12 me-2"><i className="bi bi-folder2-open me-1 fs-14"></i>HTML File</span> <span className="fs-13"><i className="bi bi-download"></i></span></div> </div>)
    },

    {
        id: 2, previewIcon: <span className="avatar avatar-md bg-secondary rounded-circle"><i className="ti ti-discount-2 fs-18"></i></span>, item2: "",
        divElement: (<div> <Link to={`${import.meta.env.BASE_URL}Pages/NotificationList/`} className="mb-0 fs-13 font-weight-semibold text-dark">Conference meeting about client project</Link> <div className="p-1"> <span className="fs-11 text-muted me-3"><i className="bi bi-calendar me-1"></i>Monday - 11:00 AM - 45 minutes</span> </div><Link to="profile.html" className="d-flex align-items-center mt-1"> <span className="avatar avatar-sm brround"> <img src={ALLImages('user1')} className="brround" alt="img" /> </span> <span className="ms-2 fs-13 text-gray-600">Nile Rebort</span> </Link> </div>)
    },
    {
        id: 3, previewIcon: <span className="avatar avatar-md bg-pink rounded-circle"><i className="ti ti-user-check fs-18"></i></span>, item2: (<div className="fs-12"> <small className="text-muted fs-12">Hi, can i change my commission amount?</small> <div className="mt-2"> <button type="button" className="btn btn-primary-light btn-sm me-1 fs-11">Accept</button> <button type="button" className="btn btn-danger-light btn-sm fs-11">Reject</button> </div></div>),
        divElement: (<Link to={`${import.meta.env.BASE_URL}Pages/NotificationList/`} className="mb-0 fs-13 font-weight-semibold text-dark">Taylor invite to a design channel</Link>)
    },
    {
        id: 4, previewIcon: <span className="avatar avatar-md bg-warning rounded-circle"><i className="ti ti-circle-check fs-18"></i></span>, item2: "", divElement: (<>
            <div>
                <Link to={`${import.meta.env.BASE_URL}Pages/NotificationList/`} className="mb-0 fs-13 font-weight-semibold text-dark">Order Placed <span className="text-primary">ID: #1116773</span></Link>
                <div className="d-flex">  <p className="text-muted">Order Placed Successfully</p><p className="align-self-end min-w-fit-content text-muted mg-s-5">12:46</p></div>
            </div></>)
    }
]

export interface cartDataType {
    id: number;
    preview: string;
    title: string;
    qty: string;
    price: number;
    defaultdata: number;
    total: number;
}


export const ShopingCartData: cartDataType[] = [
    { id: 1, preview: ALLImages('product9'), title: 'A blue flower bucket', qty: '2Kgs', price: 568, defaultdata: 3, total: 1704 },
    { id: 2, preview: ALLImages('product10'), title: 'A New Magnus airpods', qty: '1 piece', price: 1027, defaultdata: 1, total: 1027 },
    { id: 3, preview: ALLImages('product8'), title: 'Kids T-shirts', qty: '3pcs', price: 1589, defaultdata: 2, total: 3178 },
    { id: 4, preview: ALLImages('product7'), title: 'Rose Liquid Bottle', qty: '1pc', price: 1027, defaultdata: 1, total: 1027 },
    { id: 5, preview: ALLImages('product5'), title: 'Hand Picked Camera', qty: '1pc', price: 1589, defaultdata: 1, total: 1589 },
    { id: 6, preview: ALLImages('product11'), title: 'Green Mike Shoes', qty: '1pc', price: 3589, defaultdata: 1, total: 3589 },
    { id: 7, preview: ALLImages('product12'), title: 'Black Sunshade Glasses', qty: '1pc', price: 609, defaultdata: 1, total: 609 },
]

export interface DataType {
    id: number;
    preview: string;
    title: string;
    sub_title: string;
    finalprice: number;
    actualprice: number;
    offerpercentage: number;
    class: string;
}

export const Wishlistdata: DataType[] = [
    { id: 1, preview: ALLImages('shop9'), title: 'A White Table Lamp', sub_title: 'Electronics', finalprice: 852, actualprice: 1700, offerpercentage: 50, class: 'danger' },
    { id: 2, preview: ALLImages('shop10'), title: 'A Green Sleeve Tshirt', sub_title: 'Clothes', finalprice: 950, actualprice: 1900, offerpercentage: 59, class: 'success' },
    { id: 3, preview: ALLImages('shop11'), title: 'A Semi Minimal Chair', sub_title: 'Furnitures', finalprice: 1150, actualprice: 2000, offerpercentage: 47, class: 'success' },
    { id: 4, preview: ALLImages('shop13'), title: 'Casual Leather Shoes', sub_title: 'Footwear', finalprice: 2200, actualprice: 3500, offerpercentage: 35, class: 'success' },
    { id: 5, preview: ALLImages('shop12'), title: 'Fashion 3D Sun Glasses', sub_title: 'Fashion', finalprice: 990, actualprice: 1100, offerpercentage: 19, class: 'success' },
    { id: 6, preview: ALLImages('shop14'), title: 'A Brown Men-s Hoodie', sub_title: 'Fashion', finalprice: 1500, actualprice: 1900, offerpercentage: 35, class: 'danger' },
    { id: 7, preview: ALLImages('shop15'), title: 'Three Water Bottles', sub_title: 'Stationary', finalprice: 500, actualprice: 600, offerpercentage: 10, class: 'success' },
    { id: 8, preview: ALLImages('shop16'), title: 'A Brown Women Bag', sub_title: 'Stationary', finalprice: 800, actualprice: 1700, offerpercentage: 40, class: 'danger' },
    { id: 9, preview: ALLImages('shop18'), title: 'Soundtrack Headsets', sub_title: 'Gadgets', finalprice: 900, actualprice: 1800, offerpercentage: 50, class: 'success' },
    { id: 10, preview: ALLImages('shop19'), title: 'Men-s Red Tshirt', sub_title: 'Fashion', finalprice: 650, actualprice: 1700, offerpercentage: 40, class: 'danger' },
]

export const ColoredCheckBox = [
    { id: '1', class1: 'mb-2', class2: '', text: 'Primary' },
    { id: '2', class1: 'mb-2', class2: 'secondary', text: 'Secondary' },
    { id: '3', class1: 'mb-2', class2: 'warning', text: 'Warning' },
    { id: '4', class1: 'mb-2', class2: 'info', text: 'Info' },
    { id: '5', class1: 'mb-2', class2: 'success', text: 'Success' },
    { id: '6', class1: 'mb-2', class2: 'danger', text: 'Danger' },
    { id: '7', class1: 'mb-0', class2: 'dark', text: 'Dark' }
];

export interface DismissableItem {
    id: number;
    color: string;
    word: string;
}

export const Dismissable: DismissableItem[] = [
    { id: 1, color: 'primary', word: "One" },
    { id: 2, color: 'secondary', word: "Two" },
    { id: 3, color: 'info', word: "Three" },
    { id: 4, color: 'success', word: "Four" },
    { id: 5, color: 'warning', word: "Five" },
];

export const roundedStyle: Array<{ word: string; color: string }> = [
    { color: "primary", word: "First tag" },
    { color: "secondary", word: "Second tag" },
    { color: "success", word: "Third tag" },
    { color: "info", word: "Fourth tag" },
];

export interface SoliddismissItem {
    id: number;
    icon: string;
    color: string;
}

export const withIcon: SoliddismissItem[] = [
    { id: 1, icon: "fe fe-bell", color: "primary" },
    { id: 2, icon: "fe fe-settings", color: "secondary" },
    { id: 3, icon: "fe fe-share-2", color: "success" },
    { id: 4, icon: "fe fe-user", color: "warning" },
    { id: 5, icon: "fe fe-wifi", color: "info" },
    { id: 6, icon: "fe fe-airplay", color: "danger" },
];

export const sizes: Array<{ color: string; size: string; title: string }> = [
    { color: "primary", size: "sm", title: "First tag" },
    { color: "secondary", size: "md", title: "Second tag" },
    { color: "success", size: "lg", title: "Third tag" },
    { color: "pink", size: "xl", title: "Fourth tag" },
    { color: "info", size: "xxl", title: "Fifth tag" },
];

export const ColorData: Array<{ color: string; title: string; hashcode: string }> = [
    { color: "primary", title: ".bg-primary", hashcode: "#00a5a2" },
    { color: "secondary", title: ".bg-secondary", hashcode: "#db555d" },
    { color: "warning", title: ".bg-warning", hashcode: "#f7b725" },
    { color: "info", title: ".bg-info", hashcode: "#17b1df" },
    { color: "success", title: ".bg-success", hashcode: "#44b86c" },
    { color: "danger", title: ".bg-danger", hashcode: "#e82646" },
    { color: "", title: ".bg-light", hashcode: "#f3f6f8" },
    { color: "dark", title: ".bg-dark", hashcode: "#232323" }
];

export const Contextual: Array<{ color: string; title: string; hashcode: string }> = [
    { color: "primary", title: "{.bg-primary}", hashcode: "#00a5a2" },
    { color: "info", title: "{.bg-info}", hashcode: "#17b1df" },
    { color: "secondary", title: "{.bg-secondary}", hashcode: "#db555d" },
    { color: "warning", title: "{.bg-warning}", hashcode: "#dbb255" },
    { color: "danger", title: "{.bg-danger}", hashcode: "#e82646" },
    { color: "success", title: "{.bg-success}", hashcode: "#69b747" },
];

export const ContextualTransparent: Array<{ color: string; title: string; hashcode: string }> = [
    { color: "primary", hashcode: "#ccedec", title: ".bg-primary-transparent" },
    { color: "info", hashcode: "#d1eff9", title: ".bg-info-transparent" },
    { color: "secondary", hashcode: "#f8dddf", title: ".bg-secondary-transparent" },
    { color: "warning", hashcode: "#f8f0dd", title: ".bg-warning-transparent" },
    { color: "danger", hashcode: "#fad4da", title: ".bg-danger-transparent" },
    { color: "success", hashcode: "#e1f1da", title: ".bg-success-transparent" }
];

export const otherColor = [
    { color: "blue", hashcode: "#3223f1", },
    { color: "teal", hashcode: "#1caf9f", },
    { color: "azure", hashcode: "#45aaf2", },
    { color: "orange", hashcode: "#fc7303", },
    { color: "cyan", hashcode: "#007ea7", },
    { color: "yellow", hashcode: "#FBB034", },
    { color: "gray", hashcode: "#5a6970", },
    { color: "purple", hashcode: "#8927ec", },
    { color: "lime", hashcode: "#7bd235", },
    { color: "gray-dark", hashcode: "#343a40", },
    { color: "green", hashcode: "#4ecc48", },
    { color: "pink", hashcode: "#fc5296", },
    { color: "secondary", hashcode: "#05c3fb", },
    { color: "red", hashcode: "#e73827", },
    { color: "indigo", hashcode: "#6574cd", }
];


export interface ButtonDataType {
    icon: string;
    variant: string;
    items: string[];
}
export const buttonsData: ButtonDataType[] = [{ icon: 'fe-github', variant: 'secondary', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-bell', variant: 'success', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-star', variant: 'warning rounded-pill', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-mail', variant: 'blue-light', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-user-check', variant: 'success-light', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-git-merge', variant: 'info-light rounded-pill', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-star', variant: 'outline-warning', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-trash', variant: 'outline-danger', items: ['Action', 'Another action', 'Something else here', 'Separated link'] },
{ icon: 'fe-mail', variant: 'outline-info rounded-pill', items: ['Action', 'Another action', 'Something else here', 'Separated link'] }]


export interface alertDataType {
    id: number;
    variant: string;
    title: string;
}
export const alertData: alertDataType[] = [
    { id: 1, variant: 'primary', title: 'Well done!' },
    { id: 2, variant: 'secondary', title: 'Well done!' },
    { id: 3, variant: 'success', title: 'Well done!' },
    { id: 4, variant: 'info', title: 'Heads up!' },
    { id: 5, variant: 'light', title: 'Heads up!' },
    { id: 6, variant: 'dark', title: 'Heads up!' },
    { id: 7, variant: 'warning', title: 'Warning!' },
    { id: 8, variant: 'danger', title: 'Oh snap!' },
]
export interface alertDataType {
    id: number;
    variant: string;
    title: string;
}
export const LinkColor: alertDataType[] = [
    { id: 1, variant: 'primary', title: 'Well done!' },
    { id: 2, variant: 'secondary', title: 'Well done!' },
    { id: 3, variant: 'success', title: 'Well done!' },
    { id: 4, variant: 'info', title: 'Heads up!' },
    { id: 5, variant: 'warning', title: 'Warning!' },
    { id: 6, variant: 'danger', title: 'Oh snap!' },
]

export interface iconAlertDataType {
    id: number;
    variant: string;
    title: string;
    icon: string;
}

export const iconAlert: iconAlertDataType[] = [
    { id: 1, variant: 'primary', title: 'Well done!', icon: 'fa-check-circle-o' },
    { id: 2, variant: 'secondary', title: 'Well done!', icon: 'fa-bell-o' },
    { id: 3, variant: 'success', title: 'Well done!', icon: 'fa-check-circle-o' },
    { id: 4, variant: 'info', title: 'Heads up!', icon: 'fa-bell-o' },
    { id: 5, variant: 'warning', title: 'Warning!', icon: 'fa-exclamation' },
    { id: 6, variant: 'danger', title: 'Oh snap!', icon: 'fa-frown-o' },
]

export const AlertwithIcon = [
    { id: 1, variant: 'default', icon: 'fe-download' },
    { id: 2, variant: 'primary', icon: 'fe-check-square' },
    { id: 3, variant: 'success', icon: 'fe-thumbs-up' },
    { id: 4, variant: 'info', icon: 'fe-bell' },
    { id: 5, variant: 'warning', icon: 'fe-info' },
    { id: 6, variant: 'danger', icon: 'fe-slash' },
]

export interface avatarAlertDataType {
    id: number;
    variant: string;
    preview: string;
}
export const AlertwithAvatar: avatarAlertDataType[] = [
    { id: 1, variant: 'primary', preview: ALLImages('user14') },
    { id: 2, variant: 'secondary', preview: ALLImages('user14') },
    { id: 3, variant: 'success', preview: ALLImages('user5') },
    { id: 4, variant: 'info', preview: ALLImages('user5') },
    { id: 5, variant: 'warning', preview: ALLImages('user15') },
    { id: 6, variant: 'danger', preview: ALLImages('user6') },
]

export const OutLineColorAlert: iconAlertDataType[] = [
    { id: 1, variant: 'primary', title: 'Well done!', icon: 'fe-check-circle' },
    { id: 2, variant: 'secondary', title: 'Well done!', icon: 'fe-user-check' },
    { id: 3, variant: 'success', title: 'Well done!', icon: 'fe-thumbs-up' },
    { id: 4, variant: 'info', title: 'Heads up!', icon: 'fe-bell' },
    { id: 5, variant: 'warning', title: 'Warning!', icon: 'fe-info' },
]

export interface CustomAlertDataType {
    id: number;
    variant: string;
    icon: string;
    title: string;
    description: string;
    btnText?: string;
    btnCancelText?: string;
    btnDeleteText?: string;
}

export const CustomAlertData: CustomAlertDataType[] = [
    {
        id: 1,
        variant: 'success',
        icon: 'check-circle',
        title: 'Congratulations',
        description: 'Sent successfully',
        btnText: 'Done',
    },
    {
        id: 2,
        variant: 'danger',
        icon: 'info',
        title: 'Warning',
        description: 'Are you sure you want to delete 20 items',
        btnCancelText: 'Cancel',
        btnDeleteText: 'Delete',
    },
    {
        id: 3,
        variant: 'info',
        icon: 'bell',
        title: 'Alert',
        description: 'Are you sure you want to end current services',
        btnText: 'Done',
    },
    {
        id: 4,
        variant: 'warning',
        icon: 'zap',
        title: 'Processing',
        description: 'Your process currently in progress',
        btnCancelText: 'Cancel',
        btnDeleteText: 'Delete',
    },
]

export const tooltipdata = [
    { id: 1, color: "primary", place: 'top' },
    { id: 2, color: "secondary", place: 'right' },
    { id: 3, color: "warning", place: 'top' },
    { id: 4, color: "info", place: 'left' },
    { id: 5, color: "danger", place: 'right' },
    { id: 6, color: "success", place: 'top' },
    { id: 7, color: "light", place: 'top' },
    { id: 8, color: "dark", place: 'left' }
]

export const popoverData = [
    { id: 1, color: "secondary", place: 'right' },
    { id: 2, color: "primary", place: 'top' },
    { id: 3, color: "info", place: 'bottom' },
    { id: 4, color: "warning", place: 'left' },
    { id: 5, color: "success", place: 'top' },
    { id: 6, color: "danger", place: 'left' },
]

export const ColoredpopoverData = [
    { id: 1, color: "secondary", place: 'right' },
    { id: 2, color: "primary", place: 'top' },
    { id: 3, color: "info", place: 'bottom' },
    { id: 4, color: "warning", place: 'left' },
    { id: 5, color: "success", place: 'top' },
    { id: 6, color: "danger", place: 'left' },
    { id: 7, color: "teal", place: 'right' },
    { id: 8, color: "purple", place: 'bottom' },
]

export const DismispopoverData = [
    { id: 1, color: "secondary", place: 'right' },
    { id: 2, color: "primary", place: 'top' },
    { id: 3, color: "info", place: 'top' },
    { id: 4, color: "warning", place: 'left' },
]

export const userData = [
    {
        id: 1,
        preview: ALLImages('user16'),
        username: "Adam Cotter",
        created: "09 Dec 2017",
        country: "France",
        color: "success",
        status: 'Active',
        checked: true

    },
    {
        id: 2,
        preview: ALLImages('user15'),
        username: "Pauline Noble",
        created: "09 Dec 2017",
        country: "Brazil",
        color: "danger",
        status: 'Inactive',
        checked: false
    },
    {
        id: 3,
        preview: ALLImages('user4'),
        username: "Sherilyn Metzel",
        created: "27 Jan 2018",
        country: "USA",
        color: "warning",
        status: 'Pending',
        checked: false
    },
    {
        id: 4,
        preview: ALLImages('user3'),
        username: "Terrie Boaler",
        created: "20 Jan 2018",
        country: "Canada",
        color: "success",
        status: 'Active',
        checked: true

    },
    {
        id: 5,
        preview: ALLImages('user19'),
        username: "Rutter Pude",
        created: "13 Jan 2018",
        country: "Australia",
        color: "warning",
        status: 'Pending',
        checked: false
    },

    {
        id: 6,
        preview: ALLImages('user21'),
        username: "Clifford Benjamin",
        created: "25 Jan 2018",
        country: "China",
        color: "danger",
        status: 'Inactive',
        checked: false
    },
    {
        id: 7,
        preview: ALLImages('user12'),
        username: "Thedric Romans",
        created: "12 Jan 2018",
        country: "Russia",
        color: "success",
        status: 'Active',
        checked: false
    },
    {
        id: 8,
        preview: ALLImages('user15'),
        username: "Haily Carthew",
        created: "27 Jan 2018",
        country: "Thailand",
        color: "success",
        status: 'Active',
        checked: true
    },
    {
        id: 9,
        preview: ALLImages('user1'),
        username: "Dorothea Joicey",
        created: "12 Dec 2017",
        country: "Indonesia",
        color: "danger",
        status: 'Inactive',
        checked: false

    },
    {
        id: 10,
        preview: ALLImages('user12'),
        username: "Mikaela Pinel",
        created: "10 Dec 2017",
        country: "France",
        color: "warning",
        status: 'Pending',
        checked: false

    },
    {
        id: 11,
        preview: ALLImages('user15'),
        username: "Donnell Farries",
        created: "03 Dec 2017",
        country: "Poland",
        color: "success",
        status: 'Active',
        checked: false
    },
    {
        id: 12,
        preview: ALLImages('user4'),
        username: "Letizia Puncher",
        created: "09 Dec 2017",
        country: "Ukraine",
        color: "danger",
        status: 'Inactive',
        checked: true
    }
]