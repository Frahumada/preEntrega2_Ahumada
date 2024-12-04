import { Router } from "express";
const cartRouter = Router();

import cartManager from "../managers/cart.manager.js";
import { __dirname } from "../path.js";

const cManager = new cartManager(`${__dirname}/db/carts.json`);

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cManager.createCart();
    res.json(newCart);
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const {cid} = req.params;
    const cart = await cManager.getCartByID(cid);
    if (!cart) res.status(404).json({ msg: "Cart not found ROUTER" });
    else res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cManager.getAllCarts();
    const { limit } = req.query;
    if (!limit) {
      res.status(200).json(carts);
    } else {
      const parsedLimit = parseInt(limit, 10);
      console.log(parsedLimit);
      console.log(limit);
      if (isNaN(parsedLimit) || parsedLimit < 0) {
        res.status(404).json({ msg: "Invalid limit" });
      } else {
        const totalCarts = carts.splice(0, parsedLimit);
        if (!totalCarts) {
          res.json({ msg: "No existen carritos creados" });
        } else {
          res.status(200).json(totalCarts);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

cartRouter.post ("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const response = await cManager.addProductToCart(cid, pid);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
})



export default cartRouter;
