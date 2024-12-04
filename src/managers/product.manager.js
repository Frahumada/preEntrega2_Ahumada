import fs from "fs";
import { v4 as uuid } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(objeto) {
    try {
      const product = {
        id: uuid(),
        ...objeto,
      };
      const products = await this.getProducts(); //Obtengo productos
      products.push(product); //Inserto nuevo producto
      await fs.promises.writeFile(this.path, JSON.stringify(products)); //Escribo nuevo array de productos en archivo de pesistencia de datos
      return product; //retorno el producto
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(id) {
    try {
      const products = await this.getProducts();
      const productExists = products.find((product) => product.id === id);
      if (productExists) return productExists;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(updates, idproduct) {
    try {
      const exist = await this.getProductsById(idproduct); //Obtengo producto a actualizar
      if (exist) {
        //Si existe obtenemos array de productos
        const products = await this.getProducts();
        const partialproducts = products.filter((prod) => prod.id !== exist.id); //filtro array para que quede sin el prod a actualizar
        const productUpdated = { ...exist, ...updates }; //Merge de propiedades en un mismo objeto (Los de la derecha, pisan a los de la izquierda)
        partialproducts.push(productUpdated); //guardo en el array parcial el objeto modificado
        await fs.promises.writeFile(this.path, JSON.stringify(partialproducts));
      }
      return exist;
    } catch (error) {
      console.log(error + "--> CATCH en update");
    }
  }

  async deleteProduct(idproduct) {
    try {
      const productToDelete = await this.getProductsById(idproduct); //Obtengo producto desde su ID
      if (productToDelete) {
        const products = await this.getProducts(); //Obtengo todos los productos
        const partialproducts = products.filter(
          (prod) => prod.id !== productToDelete.id
        ); //filtro array para que quede sin el prod a eliminar
        await fs.promises.writeFile(this.path, JSON.stringify(partialproducts)); //Escribo el nuevo array de productos
      } else {
        console.log(error + "--> No entro al true en el delete product");
      }
      return productToDelete;
    } catch (error) {
      console.log("Error deleting product");
    }
  }
}
