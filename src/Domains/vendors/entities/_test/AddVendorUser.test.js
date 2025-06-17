const AddVendorUser = require("../AddVendorUser");

describe("AddVendorUser entities", () => {
  it("should throw error when payload not contain needed property", () => {
    // Arrange
    const payload = {
      vendorId: "vendor-123",
      userId: "user-123",
    };

    // Action & Assert
    expect(() => new AddVendorUser(payload)).toThrowError(
      "ADD_VENDOR_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload not meet data type specification", () => {
    // Arrange
    const payload = {
      vendorId: 123,
      userId: "user-123",
      roleInVendor: "staff",
    };

    // Action & Assert
    expect(() => new AddVendorUser(payload)).toThrowError(
      "ADD_VENDOR_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when role is not valid", () => {
    // Arrange
    const payload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "invalid-role",
    };

    // Action & Assert
    expect(() => new AddVendorUser(payload)).toThrowError(
      "ADD_VENDOR_USER.ROLE_NOT_VALID"
    );
  });

  it("should create AddVendorUser entities correctly", () => {
    // Arrange
    const payload = {
      vendorId: "vendor-123",
      userId: "user-123",
      roleInVendor: "staff",
    };

    // Action
    const addVendorUser = new AddVendorUser(payload);

    // Assert
    expect(addVendorUser).toBeInstanceOf(AddVendorUser);
    expect(addVendorUser.vendorId).toEqual(payload.vendorId);
    expect(addVendorUser.userId).toEqual(payload.userId);
    expect(addVendorUser.roleInVendor).toEqual(payload.roleInVendor);
  });
});
