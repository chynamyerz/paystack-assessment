import { IContext } from "../../types";

export const editProductInCartMutation = async (
  _: any,
  {
    productOnCartId,
    quantity,
    userId,
  }: {
    productOnCartId: number;
    quantity?: number;
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

    if (quantity) {
      const stock = product.categoryProduct.product.stock;
      // Check if product in stock is enough
      if (product.categoryProduct.product.stock - quantity < 0) {
        throw new Error(
          `Cannot update to cart, not enough stock, available stock ${stock}`
        );
      }

      await ctx.prisma.productOnCart.update({
        where: {
          id: productOnCartId,
        },
        data: {
          quantity,
          totalAmount: product.categoryProduct.product.price * quantity,
        },
      });

      // Update stock quantity
      await ctx.prisma.product.update({
        where: {
          id: product.categoryProduct.product.id,
        },
        data: {
          stock: stock - Math.abs(product.quantity - quantity),
        },
      });
    }
    return {
      message: "Product edited in cart successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
