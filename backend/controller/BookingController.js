import bookingModel from "../model/bookingSchema.js";
import itemModel from "../model/itemSchema.js";

const orderBook = async (req, res, next) => {
  try {
    const userId = req.user;
    const { items, deliveryAddress } = req.body;

    let totalAmount = 0;
    for (const element of items) {
      const item = await itemModel.findById(element.itemId);
      if (!item) {
        return res
          .status(404)
          .json({ message: `Item not found with ID: ${element.itemId}` });
      }
      totalAmount += Number(item.price) * element.quantity;
    }
    const order = new bookingModel({
      userId,
      items,
      totalAmount,
      deliveryAddress,
    });
    await order.save();
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
const cancelOrder = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    const order = await bookingModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.status === "delivered") {
      return res
        .status(400)
        .json({ message: "Delivered product cannot be cancelled." });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Product is already cancelled." });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const showAllOrder = async (req, res, next) => {
  const userId = req.user;

  try {
    const allOrder = await bookingModel
      .find({ userId })
      .populate("items.itemId")
      .sort({ createdAt: -1 });

    if (!allOrder || allOrder.length === 0) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetch successfully",
      order: allOrder,
    });
  } catch (error) {
    next(error);
  }
};
export { orderBook, cancelOrder, showAllOrder };
