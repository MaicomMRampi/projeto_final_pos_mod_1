import { createProductService, allProductsService, countProductsService, getProductIdService } from "../service/productService.js"

export async function createProduct(req, res) {
  try {
    const { name, description, value } = req.body

    if (!name || !description || !value) return res.status(400).json({ message: `Campo name, description e value, são obrigatórios` })

    const response = await createProductService({ name, description, value })

    res.status(response.code).json({ message: response.message })

  } catch (error) {
    return res.status(500).json({ message: `Erro ao inserir produtos:${error?.message}` })
  }
}

export async function allProducts(req, res) {
  try {
    const response = await allProductsService()
    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: `Erro ao buscat todos os produtos:${error?.message}` })
  }
}

export async function countProducts(req, res) {
  try {
    const response = await countProductsService()
    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: `Erro ao buscat todos os produtos:${error?.message}` })
  }
}
export async function getProductId(req, res) {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'Id do produto é obrigatório' })
    const response = await getProductIdService(id)

    res.status(response.code).json(response)
  } catch (error) {
    return res.status(500).json({ message: `Erro ao buscar produto:${error?.message}` })
  }
}