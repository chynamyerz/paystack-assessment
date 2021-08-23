import { IContext } from "../../types";

export const removeProductFromCartMutation = async (
  _: any,
  {
    productOnCartId,
    userId,
  }: {
    productOnCartId: number;
    userId: number;
  },
  ctx: IContext
) => {
  try {
    // productOnCartId id is required
    if (!productOnCartId) {
      throw new Error("Product on cart id is required.");
    }

    // User id is required
    if (!userId) {
      throw new Error("User id is required.");
    }

    const product = await ctx.prisma.productOnCart.findUnique({
      where: { id: productOnCartId },
      select: {
        quantity: true,
        categoryProduct: {
          select: {
            product: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error(
        `Product on cart with Id ${productOnCartId} does not exist.`
      );
    }

    await ctx.prisma.productOnCart.delete({
      where: {
        id: productOnCartId,
      },
    });

    // Update stock quantity
    await ctx.prisma.product.update({
      where: {
        id: product.categoryProduct.product.id,
      },
      data: {
        stock: product.categoryProduct.product.stock + product.quantity,
      },
    });

    return {
      message: "Product removed from cart successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
