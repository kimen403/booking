class GetCategoryByIdUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(categoryId) {
    return this._categoryRepository.getCategoryById(categoryId);
  }
}

module.exports = GetCategoryByIdUseCase;
