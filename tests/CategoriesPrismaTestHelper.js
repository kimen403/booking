/* istanbul ignore file */
const prisma = require("../src/Infrastructures/database/prisma");

const CategoriesPrismaTestHelper = {
  async addCategory({
    id = "category-123",
    name = "Test Category",
    created_at = new Date(),
    updated_at = new Date(),
  }) {
    await prisma.category.create({
      data: {
        id,
        name,
        created_at,
        updated_at,
      },
    });
  },

  async findCategoryById(id) {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category ? [category] : [];
  },

  async findCategoryByName(name) {
    const category = await prisma.category.findFirst({
      where: { name },
    });
    return category ? [category] : [];
  },

  async getAllCategories() {
    return await prisma.category.findMany();
  },

  async cleanTable() {
    await prisma.category.deleteMany({});
  },
};

module.exports = CategoriesPrismaTestHelper;
