const NewCategory = require("../../../Domains/categories/entities/NewCategory");

class AddCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    const newCategory = new NewCategory(useCasePayload);
    return this._categoryRepository.addCategory(newCategory);
  }
}

module.exports = AddCategoryUseCase;
