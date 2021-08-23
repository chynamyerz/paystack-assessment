import { IContext } from "../../types";

export const addProductToCartMutation = async (
  _: any,
  {
    categoryProductId,
    quantity,
    userId,
  }: {
    categoryProductId: number;
    quantity: number;
    userId: number;
  },
  ctx: IContext
) => {
  try {
    // categoryProductId id is required
    if (!categoryProductId) {
      throw new Error("Category product id is required.");
    }

    // User id is required
    if (!userId) {
      throw new Error("User id is required.");
    }

    const product = await ctx.prisma.categoryProduct.findUnique({
      where: { id: categoryProductId },
      select: {
        product: true,
      },
    });

    if (!product) {
      throw new Error(
        `Category product with Id ${categoryProductId} does not exist.`
      );
    }

    // Check if product in stock is enough
    if (product.product.stock - quantity < 0) {
      throw new Error("Cannot add to cart, not enough stock");
    }

    // Add to cart
    await ctx.prisma.productOnCart.create({
      data: {
        categoryProduct: {
          connect: {
            id: categoryProductId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        quantity,
        totalAmount: product.product.price * quantity,
      },
    });

    // Update stock quantity
    await ctx.prisma.product.update({
      where: {
        id: product.product.id,
      },
      data: {
        stock: product.product.stock - quantity,
      },
    });

    return {
      message: "Product added to cart successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
