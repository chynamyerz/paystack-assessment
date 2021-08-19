import { IContext } from "../../types";

export const editProductInCartMutation = async (
  _: any,
  {productId, userId}: {
    productId: number;
    userId: number;
  },
  ctx: IContext
) => {
  try {
    // Product id is required
    if (!productId) {
      throw new Error("Product id is required.");
    }

    // User id is required
    if (!userId) {
      throw new Error("User id is required.");
    }

    // TODO: Call actual mutation to the database

    return {
      message: "Product edited in cart successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};