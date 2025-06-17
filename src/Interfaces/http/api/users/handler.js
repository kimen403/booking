const AddUserUseCase = require("../../../../Applications/use_case/UserUseCase/AddUserUseCase");
const GetAllUsersUseCase = require("../../../../Applications/use_case/UserUseCase/GetAllUsersUseCase");
const GetUserByIdUseCase = require("../../../../Applications/use_case/UserUseCase/GetUserByIdUseCase");
const UpdateUserUseCase = require("../../../../Applications/use_case/UserUseCase/UpdateUserUseCase");
const DeleteUserUseCase = require("../../../../Applications/use_case/UserUseCase/DeleteUserUseCase");
const SuspendUserUseCase = require("../../../../Applications/use_case/UserUseCase/SuspendUserUseCase");
const BanUserUseCase = require("../../../../Applications/use_case/UserUseCase/BanUserUseCase");
const ActivateUserUseCase = require("../../../../Applications/use_case/UserUseCase/ActivateUserUseCase");
const CheckUserAvailabilityUseCase = require("../../../../Applications/use_case/UserUseCase/CheckUserAvailabilityUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.putUserHandler = this.putUserHandler.bind(this);
    this.deleteUserHandler = this.deleteUserHandler.bind(this);
    this.suspendUserHandler = this.suspendUserHandler.bind(this);
    this.banUserHandler = this.banUserHandler.bind(this);
    this.activateUserHandler = this.activateUserHandler.bind(this);
    this.checkUserAvailabilityHandler =
      this.checkUserAvailabilityHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: "success",
      data: addedUser,
    });

    response.code(201);
    return response;
  }

  async getUsersHandler() {
    const getAllUsersUseCase = this._container.getInstance(
      GetAllUsersUseCase.name
    );
    const users = await getAllUsersUseCase.execute();
    return {
      status: "success",
      data: users,
    };
  }

  async getUserByIdHandler(request) {
    const getUserByIdUseCase = this._container.getInstance(
      GetUserByIdUseCase.name
    );
    const user = await getUserByIdUseCase.execute(request.params.id);

    return {
      status: "success",
      data: {
        user,
      },
    };
  }

  async putUserHandler(request) {
    const updateUserUseCase = this._container.getInstance(
      UpdateUserUseCase.name
    );
    const { id } = request.params;

    const updatedUser = await updateUserUseCase.execute(id, {
      ...request.payload,
      currentEmail: request.payload.email,
    });

    return {
      status: "success",
      data: updatedUser,
    };
  }

  async deleteUserHandler(request) {
    const deleteUserUseCase = this._container.getInstance(
      DeleteUserUseCase.name
    );
    await deleteUserUseCase.execute(request.params.id);

    return {
      status: "success",
      message: "user berhasil dihapus",
    };
  }

  async suspendUserHandler(request) {
    const suspendUserUseCase = this._container.getInstance(
      SuspendUserUseCase.name
    );
    await suspendUserUseCase.execute(request.params.id);

    return {
      status: "success",
      message: "user berhasil di-suspend",
    };
  }

  async banUserHandler(request) {
    const banUserUseCase = this._container.getInstance(BanUserUseCase.name);
    await banUserUseCase.execute(request.params.id);

    return {
      status: "success",
      message: "user berhasil di-ban",
    };
  }

  async activateUserHandler(request) {
    const activateUserUseCase = this._container.getInstance(
      ActivateUserUseCase.name
    );
    await activateUserUseCase.execute(request.params.id);

    return {
      status: "success",
      message: "user berhasil diaktifkan",
    };
  }

  async checkUserAvailabilityHandler(request) {
    const checkUserAvailabilityUseCase = this._container.getInstance(
      CheckUserAvailabilityUseCase.name
    );
    const { id } = request.params;
    const result = await checkUserAvailabilityUseCase.execute(id);

    return {
      status: "success",
      data: result,
    };
  }
}

module.exports = UsersHandler;
