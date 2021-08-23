import { IContext } from "../../types";

export const userProductsOnCartQuery = async (
  _: any,
  { userId }: { userId: number },
  ctx: IContext
) => {
  try {
    // TODO: Return data from the database
    return ctx.prisma.productOnCart.findMany({
      where: {
        userId,
      },
      include: {
        categoryProduct: {
          include: {
            cotegory: true,
            product: true,
          },
        },
        user: true,
      },
    });
  } catch (error) {
    throw Error(error.message);
  }
};
