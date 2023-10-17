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
  userId: number;
  productId: number;
  rating: number;
  message: string;
}
type ValuesState = {
};

type StoreAction = {
  type: string;
  payload: any;
  entityReducer?: string;
};

type DispatchType = (args: StoreAction) => StoreAction;


type Identity = {
  userId?: number;
  isGuest: boolean;
  firstName?: string;
  lastName?: string;
  role?: string
}