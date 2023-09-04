import action from "./action";
import reducer from "./reducer";
import { Entity } from "./entity";
import { call } from "redux-saga/effects";

@reducer("feedbacks")
export default class FeedbackEntity extends Entity<FeedbackEntity> {

}
