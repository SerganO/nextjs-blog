import FeedbackController from "server/controllers/FeedbackController";
import container from "server/di/container";

const feedbackController =
  container.resolve<FeedbackController>("FeedbackController");

export default feedbackController
  .prepare()
  .post(feedbackController.addFeedback)
  .handler();