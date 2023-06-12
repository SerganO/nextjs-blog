import container from "server/di/container";

const productController = container.resolve("ProductController");

export default productController.handler("api/products/feedbacksIncluded");
