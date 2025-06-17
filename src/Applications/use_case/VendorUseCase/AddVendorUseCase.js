const NewVendor = require("../../../Domains/vendors/entities/NewVendor");
const InvariantError = require("../../../Commons/exceptions/InvariantError");

class AddVendorUseCase {
  constructor({ vendorRepository, vendorUserRepository }) {
    this._vendorRepository = vendorRepository;
    this._vendorUserRepository = vendorUserRepository;
  }

  async execute(useCasePayload, userId) {
    console.log("AddVendorUseCase execute", useCasePayload, userId);
    const newVendor = new NewVendor(useCasePayload);

    // Check if vendor name already exists
    await this._vendorRepository.checkVendorNameAvailability(
      newVendor.vendor_name
    );

    // Create vendor data
    const vendorData = {
      vendor_name: newVendor.vendor_name,
      vendor_description: newVendor.vendor_description,
      vendor_logo_url: newVendor.vendor_logo_url,
      contact_number: newVendor.contact_number,
      has_whatsapp: newVendor.has_whatsapp,
      status: "pending",
      // Spread address fields if provided
      ...(Object.keys(newVendor.address).length > 0 && newVendor.address),
    };

    try {
      // Create vendor
      const createdVendor = await this._vendorRepository.addVendor(vendorData);

      // Add creator as owner
      await this._vendorUserRepository.addOwner(createdVendor.id, userId);

      return createdVendor;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AddVendorUseCase;
