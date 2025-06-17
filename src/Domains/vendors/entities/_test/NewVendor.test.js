const NewVendor = require("../NewVendor");

describe("NewVendor entities", () => {
  it("should create NewVendor object correctly with minimal data", () => {
    // Arrange
    const payload = {
      vendor_name: "Test Vendor",
    };

    // Action
    const newVendor = new NewVendor(payload);

    // Assert
    expect(newVendor.vendor_name).toEqual(payload.vendor_name);
    expect(newVendor.vendor_description).toBeNull();
    expect(newVendor.vendor_logo_url).toBeNull();
    expect(newVendor.contact_number).toBeNull();
    expect(newVendor.has_whatsapp).toBeFalsy();
    expect(newVendor.address).toEqual({});
  });

  it("should create NewVendor object correctly with complete data", () => {
    // Arrange
    const payload = {
      vendor_name: "Test Vendor",
      vendor_description: "Test Description",
      vendor_logo_url: "http://example.com/logo.png",
      contact_number: "1234567890",
      has_whatsapp: true,
      address: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        postal_code: "12345",
        country: "Test Country",
        latitude: -6.2,
        longitude: 106.816666,
      },
    };

    // Action
    const newVendor = new NewVendor(payload);

    // Assert
    expect(newVendor).toEqual({
      vendor_name: payload.vendor_name,
      vendor_description: payload.vendor_description,
      vendor_logo_url: payload.vendor_logo_url,
      contact_number: payload.contact_number,
      has_whatsapp: payload.has_whatsapp,
      address: payload.address,
    });
  });

  it("should throw error when vendor_name not provided", () => {
    // Arrange
    const payload = {};

    // Action & Assert
    expect(() => new NewVendor(payload)).toThrowError(
      "NEW_VENDOR.VENDOR_NAME_NOT_VALID"
    );
  });

  it("should throw error when vendor_name not string", () => {
    // Arrange
    const payload = {
      vendor_name: 123,
    };

    // Action & Assert
    expect(() => new NewVendor(payload)).toThrowError(
      "NEW_VENDOR.VENDOR_NAME_NOT_VALID"
    );
  });

  it("should throw error when has_whatsapp not boolean", () => {
    // Arrange
    const payload = {
      vendor_name: "Test Vendor",
      has_whatsapp: "true",
    };

    // Action & Assert
    expect(() => new NewVendor(payload)).toThrowError(
      "NEW_VENDOR.INVALID_HAS_WHATSAPP"
    );
  });

  it("should throw error when address not object", () => {
    // Arrange
    const payload = {
      vendor_name: "Test Vendor",
      address: "invalid address",
    };

    // Action & Assert
    expect(() => new NewVendor(payload)).toThrowError(
      "NEW_VENDOR.INVALID_ADDRESS"
    );
  });
});
