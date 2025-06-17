const NewCategory = require("../../../Domains/categories/entities/NewCategory");

class UpdateCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(id, useCasePayload) {
    console.log("masuk usecase UpdateCategoryUseCase");
    console.log("useCasePayload", useCasePayload);
    const newCategory = new NewCategory(useCasePayload);
    await this._categoryRepository.verifyAvailableCategory(id);
    return this._categoryRepository.updateCategory(id, newCategory);
  }
}

module.exports = UpdateCategoryUseCase;
