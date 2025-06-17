const AddVendorUseCase = require("../AddVendorUseCase");
const VendorRepository = require("../../../../Domains/vendors/VendorRepository");
const VendorUserRepository = require("../../../../Domains/vendors/VendorUserRepository");
const NewVendor = require("../../../../Domains/vendors/entities/NewVendor");

describe("AddVendorUseCase", () => {
  it("should orchestrating the add vendor action correctly", async () => {
    // Arrange
    const useCasePayload = {
      vendor_name: "Test Vendor",
      vendor_description: "Test Description",
      contact_number: "1234567890",
      has_whatsapp: true,
      address: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        postal_code: "12345",
        country: "Test Country",
      },
    };

    const mockCreatedVendor = {
      id: "vendor-123",
      ...useCasePayload,
      status: "pending",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const userId = "user-123";

    /** creating dependency of use case */
    const mockVendorRepository = new VendorRepository();
    const mockVendorUserRepository = new VendorUserRepository();

    /** mocking needed function */
    mockVendorRepository.checkVendorNameAvailability = jest.fn(() =>
      Promise.resolve()
    );
    mockVendorRepository.addVendor = jest.fn(() =>
      Promise.resolve(mockCreatedVendor)
    );
    mockVendorUserRepository.addOwner = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const addVendorUseCase = new AddVendorUseCase({
      vendorRepository: mockVendorRepository,
      vendorUserRepository: mockVendorUserRepository,
    });

    // Action
    const createdVendor = await addVendorUseCase.execute(
      useCasePayload,
      userId
    );

    // Assert
    expect(mockVendorRepository.checkVendorNameAvailability).toBeCalledWith(
      useCasePayload.vendor_name
    );
    expect(mockVendorRepository.addVendor).toBeCalledWith({
      vendor_name: useCasePayload.vendor_name,
      vendor_description: useCasePayload.vendor_description,
      contact_number: useCasePayload.contact_number,
      has_whatsapp: useCasePayload.has_whatsapp,
      status: "pending",
      ...useCasePayload.address,
    });
    expect(mockVendorUserRepository.addOwner).toBeCalledWith(
      mockCreatedVendor.id,
      userId
    );
    expect(createdVendor).toEqual(mockCreatedVendor);
  });

  it("should orchestrating the add vendor action correctly with minimal data", async () => {
    // Arrange
    const useCasePayload = {
      vendor_name: "Test Vendor",
    };

    const mockCreatedVendor = {
      id: "vendor-123",
      vendor_name: useCasePayload.vendor_name,
      vendor_description: null,
      vendor_logo_url: null,
      contact_number: null,
      has_whatsapp: false,
      status: "pending",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const userId = "user-123";

    const mockVendorRepository = new VendorRepository();
    const mockVendorUserRepository = new VendorUserRepository();

    mockVendorRepository.checkVendorNameAvailability = jest.fn(() =>
      Promise.resolve()
    );
    mockVendorRepository.addVendor = jest.fn(() =>
      Promise.resolve(mockCreatedVendor)
    );
    mockVendorUserRepository.addOwner = jest.fn(() => Promise.resolve());

    const addVendorUseCase = new AddVendorUseCase({
      vendorRepository: mockVendorRepository,
      vendorUserRepository: mockVendorUserRepository,
    });

    // Action
    const createdVendor = await addVendorUseCase.execute(
      useCasePayload,
      userId
    );

    // Assert
    expect(mockVendorRepository.checkVendorNameAvailability).toBeCalledWith(
      useCasePayload.vendor_name
    );
    expect(mockVendorRepository.addVendor).toBeCalledWith({
      vendor_name: useCasePayload.vendor_name,
      vendor_description: null,
      vendor_logo_url: null,
      contact_number: null,
      has_whatsapp: false,
      status: "pending",
    });
    expect(mockVendorUserRepository.addOwner).toBeCalledWith(
      mockCreatedVendor.id,
      userId
    );
    expect(createdVendor).toEqual(mockCreatedVendor);
  });
});
