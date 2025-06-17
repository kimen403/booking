class GetAllCategoriesUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute() {
    return this._categoryRepository.getAllCategories();
  }
}

module.exports = GetAllCategoriesUseCase;
