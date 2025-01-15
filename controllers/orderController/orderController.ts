import { NextFunction, Request, Response } from "express";
import Order from "../../models/orderModel/ordersModels";
import User from "../../models/userModel/usersModels";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, product } = req.body;

    if (!userId || !product) {
      res.status(400).json({ msg: "UserId and product are required." });
      return;
    }

    const order = await Order.create({ product, userId });

    res.status(200).json({
      msg: "Order successfully created",
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ msg: "Error creating order", error: err });
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"], // Specify the fields you want from the User model
        },
      ],
    });

    if (orders.length === 0) {
      res.status(404).json({ msg: "The orders list is empty" });
      return;
    }

    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (err) {
    console.error("Error retrieving orders:", err);
    res.status(500).json({ msg: "Error retrieving orders", error: err });
  }
};
