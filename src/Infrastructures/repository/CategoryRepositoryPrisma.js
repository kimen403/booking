const CategoryRepository = require("../../Domains/categories/CategoryRepository");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");

class CategoryRepositoryPrisma extends CategoryRepository {
  constructor(prisma, idGenerator) {
    super();
    this._prisma = prisma;
    this._idGenerator = idGenerator;
  }

  async addCategory(newCategory) {
    const { name } = newCategory;
    const id = `category-${this._idGenerator()}`;

    const result = await this._prisma.category.create({
      data: {
        id,
        name,
      },
    });

    return result;
  }

  async getAllCategories() {
    const result = await this._prisma.category.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return result;
  }

  async getCategoryById(id) {
    const result = await this._prisma.category.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundError("category tidak ditemukan");
    }

    return result;
  }

  async updateCategory(id, category) {
    const { name } = category;

    const result = await this._prisma.category.update({
      where: { id },
      data: { name },
    });

    if (!result) {
      throw new NotFoundError("category tidak ditemukan");
    }

    return result;
  }

  async deleteCategory(id) {
    try {
      await this._prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError("category tidak ditemukan");
    }
  }
}

module.exports = CategoryRepositoryPrisma;
