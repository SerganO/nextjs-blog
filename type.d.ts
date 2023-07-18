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
    users: IUser[]
}

type ProductState = {
    products: IProduct[],
    pages: {
        count: number
        products: IProduct[]
    }[],
}

type FeedbackState = {
    feedbacks: IFeedback[]
}

type StoreAction = {
    type: string
    payload: any
}

type DispatchType = (args: StoreAction) => StoreAction


