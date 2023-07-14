import { IFeedback } from "server/models/Feedback"
import * as actionTypes from "../actionTypes"

const initialState: FeedbackState = {
  feedbacks: [],
}

const feedbackReducer = (
    state: FeedbackState = initialState,
    action: StoreAction
  ): FeedbackState => {
    switch (action.type) {
      case actionTypes.ADD_FEEDBACK:
        const newFeedback = action.payload.data
        return {
          ...state,
          feedbacks: state.feedbacks.concat(newFeedback),
        }
      case actionTypes.REMOVE_FEEDBACK:
        const updatedFeedbacks: IFeedback[] = state.feedbacks.filter(
            feedback => feedback.id !== action.payload.data.id
        )
        return {
          ...state,
          feedbacks: updatedFeedbacks,
        }
    }
    return state
  }
  
  export default feedbackReducer