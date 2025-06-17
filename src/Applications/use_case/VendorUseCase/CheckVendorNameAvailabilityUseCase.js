const InvariantError = require("../../../Commons/exceptions/InvariantError");

class CheckVendorNameAvailabilityUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(name) {
    if (!name) {
      throw new InvariantError("Name is required");
    }
    const trimmedName = name.trim();

    const isAvailable =
      await this._vendorRepository.checkVendorNameAvailability(trimmedName);

    if (isAvailable === false) {
      throw new InvariantError("Vendor name is not available");
    }
    return {
      available: isAvailable,
    };
  }
}

module.exports = CheckVendorNameAvailabilityUseCase;
