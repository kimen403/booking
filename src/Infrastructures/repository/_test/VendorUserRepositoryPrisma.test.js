const VendorUserRepositoryPrisma = require("../VendorUserRepositoryPrisma");
const VendorsTableTestHelper = require("../../../../tests/VendorsPrismaTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersPrismaTestHelper");
const VendorUsersTestHelper = require("../../../../tests/VendorUsersPrismaTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const prisma = require("../../database/prisma");

describe("VendorUserRepositoryPrisma", () => {
  afterEach(async () => {
    await VendorUsersTestHelper.cleanTable();
    await VendorsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("addVendorUser function", () => {
    it("should add vendor user to database", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await VendorsTableTestHelper.addVendor({ id: "vendor-123" });

      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action
      await vendorUserRepositoryPrisma.addVendorUser(
        "vendor-123",
        "user-123",
        "staff"
      );

      // Assert
      const vendorUser = await VendorUsersTestHelper.findVendorUserById(
        "vendor-123",
        "user-123"
      );
      expect(vendorUser.role_in_vendor).toEqual("staff");
    });

    it("should throw InvariantError when user already exists in vendor", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await VendorsTableTestHelper.addVendor({ id: "vendor-123" });
      await VendorUsersTestHelper.addVendorUser({
        vendor_id: "vendor-123",
        user_id: "user-123",
      });

      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action & Assert
      await expect(
        vendorUserRepositoryPrisma.addVendorUser(
          "vendor-123",
          "user-123",
          "staff"
        )
      ).rejects.toThrowError(InvariantError);
    });
  });

  describe("getUserRoleInVendor function", () => {
    it("should return user role in vendor correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await VendorsTableTestHelper.addVendor({ id: "vendor-123" });
      await VendorUsersTestHelper.addVendorUser({
        vendor_id: "vendor-123",
        user_id: "user-123",
        role_in_vendor: "manager",
      });

      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action
      const role = await vendorUserRepositoryPrisma.getUserRoleInVendor(
        "vendor-123",
        "user-123"
      );

      // Assert
      expect(role).toEqual("manager");
    });

    it("should throw NotFoundError when user not found in vendor", async () => {
      // Arrange
      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action & Assert
      await expect(
        vendorUserRepositoryPrisma.getUserRoleInVendor("vendor-123", "user-123")
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe("updateUserRole function", () => {
    it("should update user role in vendor correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await VendorsTableTestHelper.addVendor({ id: "vendor-123" });
      await VendorUsersTestHelper.addVendorUser({
        vendor_id: "vendor-123",
        user_id: "user-123",
        role_in_vendor: "staff",
      });

      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action
      await vendorUserRepositoryPrisma.updateUserRole(
        "vendor-123",
        "user-123",
        "manager"
      );

      // Assert
      const vendorUser = await VendorUsersTestHelper.findVendorUserById(
        "vendor-123",
        "user-123"
      );
      expect(vendorUser.role_in_vendor).toEqual("manager");
    });

    it("should throw NotFoundError when updating non-existent user role", async () => {
      // Arrange
      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action & Assert
      await expect(
        vendorUserRepositoryPrisma.updateUserRole(
          "vendor-123",
          "user-123",
          "manager"
        )
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe("removeVendorUser function", () => {
    it("should remove vendor user correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await VendorsTableTestHelper.addVendor({ id: "vendor-123" });
      await VendorUsersTestHelper.addVendorUser({
        vendor_id: "vendor-123",
        user_id: "user-123",
      });

      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action
      await vendorUserRepositoryPrisma.removeVendorUser(
        "vendor-123",
        "user-123"
      );

      // Assert
      const vendorUser = await VendorUsersTestHelper.findVendorUserById(
        "vendor-123",
        "user-123"
      );
      expect(vendorUser).toBeNull();
    });

    it("should throw NotFoundError when removing non-existent vendor user", async () => {
      // Arrange
      const vendorUserRepositoryPrisma = new VendorUserRepositoryPrisma(prisma);

      // Action & Assert
      await expect(
        vendorUserRepositoryPrisma.removeVendorUser("vendor-123", "user-123")
      ).rejects.toThrowError(NotFoundError);
    });
  });
});
