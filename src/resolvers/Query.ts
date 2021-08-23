import { IContext } from "./types";
import { userProductsOnCartQuery } from "./queries/cartProduct/userProductsOnCart";

export default {
  userProductsOnCart: async (
    _: any,
    { userId }: { userId: number },
    ctx: IContext
  ) => userProductsOnCartQuery(_, { userId }, ctx),
};
