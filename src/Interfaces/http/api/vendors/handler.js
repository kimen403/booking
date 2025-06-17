const AddVendorUseCase = require("../../../../Applications/use_case/VendorUseCase/AddVendorUseCase");
const AddVendorUserUseCase = require("../../../../Applications/use_case/VendorUseCase/AddVendorUserUseCase");
const GetAllVendorsUseCase = require("../../../../Applications/use_case/VendorUseCase/GetAllVendorsUseCase");
const DeleteVendorUseCase = require("../../../../Applications/use_case/VendorUseCase/DeleteVendorUseCase");
const GetVendorByIdUseCase = require("../../../../Applications/use_case/VendorUseCase/GetVendorByIdUseCase");
const UpdateVendorUseCase = require("../../../../Applications/use_case/VendorUseCase/UpdateVendorUseCase");
const VerifyVendorUseCase = require("../../../../Applications/use_case/VendorUseCase/VerifyVendorUseCase");
const RejectVendorUseCase = require("../../../../Applications/use_case/VendorUseCase/RejectVendorUseCase");
const GetVendorUsersUseCase = require("../../../../Applications/use_case/VendorUseCase/GetVendorUsersUseCase");
const GetUserVendorsUseCase = require("../../../../Applications/use_case/VendorUseCase/GetUserVendorsUseCase");
const UpdateVendorUserUseCase = require("../../../../Applications/use_case/VendorUseCase/UpdateVendorUserUseCase");
const RemoveVendorUserUseCase = require("../../../../Applications/use_case/VendorUseCase/RemoveVendorUserUseCase");

class VendorsHandler {
  constructor(container) {
    this._container = container;

    this.postVendorHandler = this.postVendorHandler.bind(this);
    this.getVendorsHandler = this.getVendorsHandler.bind(this);
    this.getVendorByIdHandler = this.getVendorByIdHandler.bind(this);
    this.putVendorByIdHandler = this.putVendorByIdHandler.bind(this);
    this.deleteVendorByIdHandler = this.deleteVendorByIdHandler.bind(this);
    this.verifyVendorHandler = this.verifyVendorHandler.bind(this);
    this.rejectVendorHandler = this.rejectVendorHandler.bind(this);
    this.addVendorUserHandler = this.addVendorUserHandler.bind(this);
    this.getVendorUsersHandler = this.getVendorUsersHandler.bind(this);
    this.getUserVendorsHandler = this.getUserVendorsHandler.bind(this);
    this.updateVendorUserHandler = this.updateVendorUserHandler.bind(this);
    this.removeVendorUserHandler = this.removeVendorUserHandler.bind(this);
  }

  async postVendorHandler(request, h) {
    const addVendorUseCase = this._container.getInstance(AddVendorUseCase.name);
    const userId = request.auth.credentials.id;
    const addedVendor = await addVendorUseCase.execute(request.payload, userId);

    const response = h.response({
      status: "success",
      data: {
        addedVendor,
      },
    });
    response.code(201);
    return response;
  }

  async getVendorsHandler(request) {
    const getAllVendorsUseCase = this._container.getInstance(
      GetAllVendorsUseCase.name
    );
    const vendors = await getAllVendorsUseCase.execute(request.query);

    return {
      status: "success",
      data: {
        vendors,
      },
    };
  }

  async getVendorByIdHandler(request) {
    const getVendorByIdUseCase = this._container.getInstance(
      GetVendorByIdUseCase.name
    );
    const vendor = await getVendorByIdUseCase.execute(request.params);

    return {
      status: "success",
      data: {
        vendor,
      },
    };
  }

  async putVendorByIdHandler(request) {
    const updateVendorUseCase = this._container.getInstance(
      UpdateVendorUseCase.name
    );

    const { id } = request.params;
    await updateVendorUseCase.execute({
      id,
      ...request.payload,
    });

    return {
      status: "success",
    };
  }

  async deleteVendorByIdHandler(request) {
    const deleteVendorUseCase = this._container.getInstance(
      DeleteVendorUseCase.name
    );
    await deleteVendorUseCase.execute(request.params);

    return {
      status: "success",
    };
  }

  async verifyVendorHandler(request) {
    const verifyVendorUseCase = this._container.getInstance(
      VerifyVendorUseCase.name
    );

    const { id } = request.params;
    const verified_by = request.auth.credentials.id;
    const { verification_notes } = request.payload;

    await verifyVendorUseCase.execute({
      id,
      verified_by,
      verification_notes,
    });

    return {
      status: "success",
    };
  }

  async rejectVendorHandler(request) {
    const rejectVendorUseCase = this._container.getInstance(
      RejectVendorUseCase.name
    );

    const { id } = request.params;
    const verified_by = request.auth.credentials.id;
    const { verification_notes } = request.payload;

    await rejectVendorUseCase.execute({
      id,
      verified_by,
      verification_notes,
    });

    return {
      status: "success",
    };
  }

  async addVendorUserHandler(request) {
    const addVendorUserUseCase = this._container.getInstance(
      AddVendorUserUseCase.name
    );

    const { id: vendorId } = request.params;
    const { userId, roleInVendor } = request.payload;

    await addVendorUserUseCase.execute({
      vendorId,
      userId,
      roleInVendor,
    });

    return {
      status: "success",
    };
  }

  async getVendorUsersHandler(request) {
    const getVendorUsersUseCase = this._container.getInstance(
      GetVendorUsersUseCase.name
    );
    const { id: vendorId } = request.params;
    const users = await getVendorUsersUseCase.execute({ vendorId });

    return {
      status: "success",
      data: {
        users,
      },
    };
  }

  async getUserVendorsHandler(request) {
    const getUserVendorsUseCase = this._container.getInstance(
      GetUserVendorsUseCase.name
    );
    const { id: userId } = request.params;
    const vendors = await getUserVendorsUseCase.execute({ userId });

    return {
      status: "success",
      data: {
        vendors,
      },
    };
  }

  async updateVendorUserHandler(request) {
    const updateVendorUserUseCase = this._container.getInstance(
      UpdateVendorUserUseCase.name
    );

    const { id: vendorId, userId } = request.params;
    const { roleInVendor: newRole } = request.payload;

    await updateVendorUserUseCase.execute({
      vendorId,
      userId,
      newRole,
    });

    return {
      status: "success",
    };
  }

  async removeVendorUserHandler(request) {
    const removeVendorUserUseCase = this._container.getInstance(
      RemoveVendorUserUseCase.name
    );

    const { id: vendorId, userId } = request.params;

    await removeVendorUserUseCase.execute({
      vendorId,
      userId,
    });

    return {
      status: "success",
    };
  }
}

module.exports = VendorsHandler;
