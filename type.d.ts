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

type ProductState = {
    mainPageInfo: {
        products: IProduct[],
    }
    products: IProduct[],
    pages: {
        page: number,
        count: number
        products: IProduct[],
        vendor?: IUser
    }[],
    selectedProductId: number,
    selectedPage: number,
}

type FeedbackState = {
    feedbacks: IFeedback[]
}

type StoreAction = {
    type: string
    payload: any
}

type DispatchType = (args: StoreAction) => StoreAction


