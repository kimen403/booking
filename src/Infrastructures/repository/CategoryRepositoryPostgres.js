const CategoryRepository = require("../../Domains/categories/CategoryRepository");
const RegisteredCategory = require("../../Domains/categories/entities/RegisteredCategory");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");

class CategoryRepositoryPostgres extends CategoryRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addCategory(newCategory) {
    const { name } = newCategory;
    const id = `category-${this._idGenerator()}`;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO categories VALUES($1, $2, $3, $4) RETURNING id, name, created_at, updated_at",
      values: [id, name, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    return new RegisteredCategory({
      id: result.rows[0].id,
      name: result.rows[0].name,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    });
  }

  async verifyAvailableCategory(id) {
    const query = {
      text: "SELECT id FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("kategori tidak ditemukan");
    }
  }

  async getCategoryById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("kategori tidak ditemukan");
    }

    return new RegisteredCategory({
      id: result.rows[0].id,
      name: result.rows[0].name,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    });
  }

  async getAllCategories() {
    const query = {
      text: "SELECT * FROM categories",
    };

    const result = await this._pool.query(query);

    return result.rows.map(
      (category) =>
        new RegisteredCategory({
          id: category.id,
          name: category.name,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })
    );
  }

  async updateCategory(id, { name }) {
    const updatedAt = new Date();

    const query = {
      text: "UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id, name, created_at, updated_at",
      values: [name, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("gagal memperbarui kategori. Id tidak ditemukan");
    }

    return new RegisteredCategory({
      id: result.rows[0].id,
      name: result.rows[0].name,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    });
  }

  async deleteCategory(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("kategori gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = CategoryRepositoryPostgres;
