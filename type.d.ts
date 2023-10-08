interface IUserPostData {
    firstName: string;
    lastName: string;
    userEmail: string;
    password: string;
    role: string;
}

interface IProductPostData {
    userId: number;
    title: string;
    description: string;
    SKU: string;
    category: string;
    price: number;
}

interface IFeedbackPostData {
    user_id: number;
    product_id: number;
    rating: number;
    message: string;
}


type UserState = {
    users: IUser[],
    selectedUser: number,
}

type IPage = {
    page: number,
    count: number
    products: IProduct[],
    vendor?: IUser
}

type MainPageInfo = {
    products: IProduct[]
}

type ProductState = {
    mainPageInfo: MainPageInfo,
    products: IProduct[],
    pages: IPage[],
    selectedProductId: number,
    selectedPage: number,
}

type FeedbackState = {
    feedbacks: IFeedback[]
}

type StoreAction = {
    type: string
    payload: any,
    entityReducer?: string
}


type StoreState = {
    users: IUser[],
    products: IProduct[],
    feedbacks: IFeedback[],
    pages: IPage[],
    mainPageInfo: MainPageInfo,
    selectedUser: number,
    selectedProductId: number,
    selectedPage: number,

}

type StoreEntitiesState = {
    entities: any
}

type ValuesState = {
    values: any

}

type DispatchType = (args: StoreAction) => StoreAction


PAGE_SIZE_20 = 20

