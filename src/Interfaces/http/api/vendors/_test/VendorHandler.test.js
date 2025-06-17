const VendorsHandler = require("../handler");
const AddVendorUseCase = require("../../../../../Applications/use_case/VendorUseCase/AddVendorUseCase");
const GetVendorUsersUseCase = require("../../../../../Applications/use_case/VendorUseCase/GetVendorUsersUseCase");
const GetUserVendorsUseCase = require("../../../../../Applications/use_case/VendorUseCase/GetUserVendorsUseCase");
const UpdateVendorUserUseCase = require("../../../../../Applications/use_case/VendorUseCase/UpdateVendorUserUseCase");
const RemoveVendorUserUseCase = require("../../../../../Applications/use_case/VendorUseCase/RemoveVendorUserUseCase");

describe("VendorsHandler", () => {
  describe("postVendorHandler", () => {
    it("should handle POST vendor request correctly", async () => {
      // Arrange
      const payload = {
        vendor_name: "Test Vendor",
      };

      /** creating dependency of use case */
      const mockAddVendorUseCase = {
        execute: jest.fn(() =>
          Promise.resolve({
            id: "vendor-123",
            ...payload,
          })
        ),
      };

      const mockContainer = {
        getInstance: jest.fn(() => mockAddVendorUseCase),
      };

      const handler = new VendorsHandler(mockContainer);

      // Action
      const response = await handler.postVendorHandler({
        payload,
        auth: { credentials: { id: "user-123" } },
      });

      // Assert
      expect(response.status).toEqual("success");
      expect(response.data.addedVendor).toBeDefined();
      expect(mockAddVendorUseCase.execute).toBeCalledWith(payload, "user-123");
    });
  });

  describe("getVendorUsersHandler", () => {
    it("should handle GET vendor users request correctly", async () => {
      // Arrange
      const mockUsers = [
        {
          id: "user-123",
          name: "John",
          role_in_vendor: "staff",
        },
      ];

      const mockGetVendorUsersUseCase = {
        execute: jest.fn(() => Promise.resolve(mockUsers)),
      };

      const mockContainer = {
        getInstance: jest.fn(() => mockGetVendorUsersUseCase),
      };

      const handler = new VendorsHandler(mockContainer);

      // Action
      const response = await handler.getVendorUsersHandler({
        params: { id: "vendor-123" },
      });

      // Assert
      expect(response.status).toEqual("success");
      expect(response.data.users).toEqual(mockUsers);
      expect(mockGetVendorUsersUseCase.execute).toBeCalledWith({
        vendorId: "vendor-123",
      });
    });
  });

  describe("getUserVendorsHandler", () => {
    it("should handle GET user vendors request correctly", async () => {
      // Arrange
      const mockVendors = [
        {
          id: "vendor-123",
          vendor_name: "Test Vendor",
          role_in_vendor: "staff",
        },
      ];

      const mockGetUserVendorsUseCase = {
        execute: jest.fn(() => Promise.resolve(mockVendors)),
      };

      const mockContainer = {
        getInstance: jest.fn(() => mockGetUserVendorsUseCase),
      };

      const handler = new VendorsHandler(mockContainer);

      // Action
      const response = await handler.getUserVendorsHandler({
        params: { id: "user-123" },
      });

      // Assert
      expect(response.status).toEqual("success");
      expect(response.data.vendors).toEqual(mockVendors);
      expect(mockGetUserVendorsUseCase.execute).toBeCalledWith({
        userId: "user-123",
      });
    });
  });

  describe("updateVendorUserHandler", () => {
    it("should handle PUT vendor user request correctly", async () => {
      // Arrange
      const mockUpdateVendorUserUseCase = {
        execute: jest.fn(() => Promise.resolve()),
      };

      const mockContainer = {
        getInstance: jest.fn(() => mockUpdateVendorUserUseCase),
      };

      const handler = new VendorsHandler(mockContainer);

      // Action
      const response = await handler.updateVendorUserHandler({
        params: { id: "vendor-123", userId: "user-123" },
        payload: { roleInVendor: "manager" },
      });

      // Assert
      expect(response.status).toEqual("success");
      expect(mockUpdateVendorUserUseCase.execute).toBeCalledWith({
        vendorId: "vendor-123",
        userId: "user-123",
        newRole: "manager",
      });
    });
  });

  describe("removeVendorUserHandler", () => {
    it("should handle DELETE vendor user request correctly", async () => {
      // Arrange
      const mockRemoveVendorUserUseCase = {
        execute: jest.fn(() => Promise.resolve()),
      };

      const mockContainer = {
        getInstance: jest.fn(() => mockRemoveVendorUserUseCase),
      };

      const handler = new VendorsHandler(mockContainer);

      // Action
      const response = await handler.removeVendorUserHandler({
        params: { id: "vendor-123", userId: "user-123" },
      });

      // Assert
      expect(response.status).toEqual("success");
      expect(mockRemoveVendorUserUseCase.execute).toBeCalledWith({
        vendorId: "vendor-123",
        userId: "user-123",
      });
    });
  });
});
