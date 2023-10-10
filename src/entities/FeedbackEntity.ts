import reducer from "./decorators/reducer";
import { BaseEntity } from "./BaseEntity";

@reducer("feedbacks")
export default class FeedbackEntity extends BaseEntity<FeedbackEntity> {

}
