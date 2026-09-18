import { db } from "../config/dbConnect.js"
import { createProduc, allProductsModel, countProductsModel, findProductById } from "../models/productModel.js"

export async function createProductService({ name, description, value }) {
  try {
    if (value <= 0) return { code: 400, message: `O valor deve ser maior que zero` }
    if (name.length < 6) return { code: 400, message: `O name deve ter mais de 5 caracteres` }

    const response = await createProduc({ name, description, value })

    return { code: 200, message: `Produto criado com sucesso!` }
  } catch (error) {

    if (error.code === '23505') {

      return { code: 400, message: `Já existe o produto inserido` }
    }
    throw new Error(`Erro interno do servidor:${error?.message}`)
  }
}

export async function allProductsService() {
  try {
    const response = await allProductsModel()
    return response.rows
  } catch (error) {
    console.log(`Erro ao buscar todos produtos:${error?.message}`)
    throw new Error(`Erro interno do servidor:${error?.message}`)
  }
}

export async function countProductsService() {
  try {
    const response = await countProductsModel()
    return response.rows
  } catch (error) {
    console.log(`Erro ao contar os produtos:${error?.message}`)
    throw new Error(`Erro interno do servidor:${error?.message}`)
  }
}

export async function getProductIdService(id) {
  const product = await findProductById(id);

  if (!product) {
    const error = new Error('Nenhum produto encontrado para o ID informado.');
    error.status = 404;
    throw error;
  }

  return product;
}