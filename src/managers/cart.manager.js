import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuid } from "uuid";

import ProductManager from "./product.manager.js";
const pM = new ProductManager(`${__dirname}/db/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    try {
      const cart = {
        id: uuid(),
        products: [],
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {}
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCartByID(cid) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id.toString() === cid);
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartID, productID) {
    try {
      const productExists = await pM.getProductsById(productID);
      const cartExists = await this.getCartByID(cartID);
      if (!productExists) {
        throw new Error(`Product ${productID} does not exist`);
      } else {
        if (!cartExists) {
          throw new Error(`CART -> ${cartID} does not exist`);
        } else {
          const productIsInCart = cartExists.products.find((p) => p.id === productID);
          if (!productIsInCart) {
            cartExists.products.push({
              id: productID,
              quantity: 1
            });
          } else {
            productIsInCart.quantity ++;
          }
          let cartsFile = await this.getAllCarts();
          const updatedCarts = cartsFile.map((cart) => {
            if (cart.id === cartID) {
              return cartExists;
            } else {
              return cart;
            }
          });
          await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
          return cartExists;
        }
      }


    } catch (error) {
      console.error(error);
    }
  }
}
