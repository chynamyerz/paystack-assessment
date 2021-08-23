import { IContext } from "./types";

import { addProductToCartMutation } from "./mutations/cartProduct/addProductToCart";
import { editProductInCartMutation } from "./mutations/cartProduct/editProductInCart";
import { removeProductFromCartMutation } from "./mutations/cartProduct/removeProductFromCart";

export default {
  /**
   * Add product to cart mutation
   */
  addProductToCart: async (
    _: any,
    {
      categoryProductId,
      quantity,
      userId,
    }: { categoryProductId: number; quantity: number; userId: number },
    ctx: IContext
  ) => {
    return addProductToCartMutation(
      _,
      { categoryProductId, quantity, userId },
      ctx
    );
  },
  /**
   * Edit product in cart mutation
   */
  editProductInCart: async (
    _: any,
    {
      productOnCartId,
      quantity,
      userId,
    }: { productOnCartId: number; quantity: number; userId: number },
    ctx: IContext
  ) => {
    return editProductInCartMutation(
      _,
      { productOnCartId, quantity, userId },
      ctx
    );
  },

  /**
   * Remove product from cart mutation
   */
  removeProductFromCart: async (
    _: any,
    { productOnCartId, userId }: { productOnCartId: number; userId: number },
    ctx: IContext
  ) => {
    return removeProductFromCartMutation(_, { productOnCartId, userId }, ctx);
  },
};
