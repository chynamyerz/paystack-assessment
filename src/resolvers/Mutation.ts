import { IContext } from "./types";

import { addProductToCartMutation } from "./mutations/cartProduct/addProductToCart";
import { editProductInCartMutation } from "./mutations/cartProduct/editProductInCart";
import { removeProductFromCartMutation } from "./mutations/cartProduct/removeProductFromCart";

export default {
  /**
   * Add product to cart mutation
   */
   addProductToCart: async (_: any, {productId, userId}: {productId: number; userId: number}, ctx: IContext) => {
    return addProductToCartMutation(_, {productId, userId}, ctx);
  },
  /**
   * Edit product in cart mutation
   */
   editProductInCart: async (_: any, {productId, userId}: {productId: number; userId: number}, ctx: IContext) => {
    return editProductInCartMutation(_, {productId, userId}, ctx);
  },

  /**
   * Remove product from cart mutation
   */
   removeProductFromCart: async (
    _: any,
    {productId, userId}: {productId: number; userId: number},
    ctx: IContext
  ) => {
    return removeProductFromCartMutation(_, {productId, userId}, ctx);
  }
};
