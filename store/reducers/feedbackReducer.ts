import { IFeedback } from "server/models/Feedback"
import * as actionTypes from "../actionTypes"

const initialState: FeedbackState = {
  feedbacks: [],
}

/*const feedbackReducer = (
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
  }*/


  const entityReducer = "feedbacks";
const feedbackReducer = (
  state: FeedbackState = initialState,
  action: StoreAction
): FeedbackState => {
  switch (action.type) {
    case actionTypes.GET:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            feedbacks: state.feedbacks.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }

      break;
    case actionTypes.ADD:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            feedbacks: state.feedbacks.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }

      break;
    case actionTypes.UPDATE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          
          const ids = new Set(Object.keys(newData));
          const newDataArr = Object.keys(newData).map(
            id => {
              return newData[id]
            }
          )
          return {
            ...state,
            feedbacks: state.feedbacks.filter((d) => !ids.has(d.id.toString())).concat(newDataArr)
          };
        }
      }
      break;
    case actionTypes.DELETE:
      if (action.payload) {
        const entitiesArr = action.payload.data.entities;
        if (entitiesArr && entityReducer in entitiesArr) {
          const newData = entitiesArr[entityReducer];
          const ids = new Set(Object.keys(newData));
          return {
            ...state,
            feedbacks: state.feedbacks.filter((d) => !ids.has(d.id.toString()))
          };
        }
      }

      break;
  }
  return state;
};
  
  export default feedbackReducer