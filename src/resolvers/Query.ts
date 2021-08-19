import { IContext } from "./types";
import { cartProductsQuery } from "./queries/cartProduct/cartProducts";

export default {
   cartProducts: async (_: any, __: any, ctx: IContext) => cartProductsQuery(_, __, ctx),
};
