const AddCategoryUseCase = require("../../../../Applications/use_case/CategoryUseCase/AddCategoryUseCase");
const GetAllCategoriesUseCase = require("../../../../Applications/use_case/CategoryUseCase/GetAllCategoriesUseCase");
const GetCategoryByIdUseCase = require("../../../../Applications/use_case/CategoryUseCase/GetCategoryByIdUseCase");
const UpdateCategoryUseCase = require("../../../../Applications/use_case/CategoryUseCase/UpdateCategoryUseCase");
const DeleteCategoryUseCase = require("../../../../Applications/use_case/CategoryUseCase/DeleteCategoryUseCase");

class CategoriesHandler {
  constructor(container) {
    this._container = container;

    this.postCategoryHandler = this.postCategoryHandler.bind(this);
    this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
    this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);
    this.putCategoryByIdHandler = this.putCategoryByIdHandler.bind(this);
    this.deleteCategoryByIdHandler = this.deleteCategoryByIdHandler.bind(this);
  }

  async postCategoryHandler(request, h) {
    const addCategoryUseCase = this._container.getInstance(
      AddCategoryUseCase.name
    );
    const addedCategory = await addCategoryUseCase.execute(request.payload);

    const response = h.response({
      status: "success",
      data: addedCategory,
    });

    response.code(201);
    return response;
  }

  async getCategoriesHandler() {
    const getAllCategoriesUseCase = this._container.getInstance(
      GetAllCategoriesUseCase.name
    );
    const categories = await getAllCategoriesUseCase.execute();

    return {
      status: "success",
      data: categories,
    };
  }

  async getCategoryByIdHandler(request) {
    const getCategoryByIdUseCase = this._container.getInstance(
      GetCategoryByIdUseCase.name
    );
    const category = await getCategoryByIdUseCase.execute(request.params.id);

    return {
      status: "success",
      data: category,
    };
  }

  async putCategoryByIdHandler(request) {
    console.log("masuk handler putCategoryByIdHandler");
    const { id } = request.params;

    const updateCategoryUseCase = this._container.getInstance(
      UpdateCategoryUseCase.name
    );

    const updatedCategory = await updateCategoryUseCase.execute(
      id,
      request.payload.data
    );

    return {
      status: "success",
      data: updatedCategory,
    };
  }

  async deleteCategoryByIdHandler(request) {
    const deleteCategoryUseCase = this._container.getInstance(
      DeleteCategoryUseCase.name
    );
    await deleteCategoryUseCase.execute(request.params.id);

    return {
      status: "success",
      message: "kategori berhasil dihapus",
    };
  }
}

module.exports = CategoriesHandler;
