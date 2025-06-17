const AddVendorUserUseCase = require("../AddVendorUserUseCase");
const VendorRepository = require("../../../../Domains/vendors/VendorRepository");
const VendorUserRepository = require("../../../../Domains/vendors/VendorUserRepository");
const UserRepository = require("../../../../Domains/users/UserRepository");
const AddVendorUser = require("../../../../Domains/vendors/entities/AddVendorUser");

describe("AddVendorUserUseCase", () => {
  it("should orchestrating the add vendor user action correctly", async () => {
    // Arrange
    const useCasePayload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "staff",
    };

    const mockVendorRepository = new VendorRepository();
    const mockVendorUserRepository = new VendorUserRepository();
    const mockUserRepository = new UserRepository();

    // Mocking
    mockVendorRepository.getVendorById = jest.fn(() =>
      Promise.resolve({
        id: "vendor-123",
        vendor_name: "Vendor Test",
      })
    );

    mockUserRepository.getUserById = jest.fn(() =>
      Promise.resolve({
        id: "user-123",
        name: "User Test",
      })
    );

    mockVendorUserRepository.addVendorUser = jest.fn(() => Promise.resolve());

    const addVendorUserUseCase = new AddVendorUserUseCase({
      vendorRepository: mockVendorRepository,
      vendorUserRepository: mockVendorUserRepository,
      userRepository: mockUserRepository,
    });

    // Action
    await addVendorUserUseCase.execute(useCasePayload);

    // Assert
    expect(mockVendorRepository.getVendorById).toBeCalledWith(
      useCasePayload.vendorId
    );
    expect(mockUserRepository.getUserById).toBeCalledWith(
      useCasePayload.userId
    );
    expect(mockVendorUserRepository.addVendorUser).toBeCalledWith(
      useCasePayload.vendorId,
      useCasePayload.userId,
      useCasePayload.roleInVendor
    );
  });

  it("should throw error if invalid role provided", async () => {
    // Arrange
    const useCasePayload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "invalid-role",
    };

    const addVendorUserUseCase = new AddVendorUserUseCase({
      vendorRepository: {},
      vendorUserRepository: {},
      userRepository: {},
    });

    // Action & Assert
    await expect(
      addVendorUserUseCase.execute(useCasePayload)
    ).rejects.toThrowError("ADD_VENDOR_USER.ROLE_NOT_VALID");
  });

  it("should throw error if vendor not found", async () => {
    // Arrange
    const useCasePayload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "staff",
    };

    const mockVendorRepository = new VendorRepository();
    mockVendorRepository.getVendorById = jest.fn(() =>
      Promise.reject(new Error("Vendor tidak ditemukan"))
    );

    const addVendorUserUseCase = new AddVendorUserUseCase({
      vendorRepository: mockVendorRepository,
      vendorUserRepository: {},
      userRepository: {},
    });

    // Action & Assert
    await expect(
      addVendorUserUseCase.execute(useCasePayload)
    ).rejects.toThrowError("Vendor tidak ditemukan");
  });

  it("should throw error if user not found", async () => {
    // Arrange
    const useCasePayload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "staff",
    };

    const mockVendorRepository = new VendorRepository();
    const mockUserRepository = new UserRepository();

    mockVendorRepository.getVendorById = jest.fn(() =>
      Promise.resolve({
        id: "vendor-123",
        vendor_name: "Vendor Test",
      })
    );

    mockUserRepository.getUserById = jest.fn(() =>
      Promise.reject(new Error("User tidak ditemukan"))
    );

    const addVendorUserUseCase = new AddVendorUserUseCase({
      vendorRepository: mockVendorRepository,
      vendorUserRepository: {},
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(
      addVendorUserUseCase.execute(useCasePayload)
    ).rejects.toThrowError("User tidak ditemukan");
  });
});
