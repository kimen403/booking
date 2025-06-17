class DeleteCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(categoryId) {
    await this._categoryRepository.verifyAvailableCategory(categoryId);
    await this._categoryRepository.deleteCategory(categoryId);
  }
}

module.exports = DeleteCategoryUseCase;
