class GetVendorByIdUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(vendorId) {
    return this._vendorRepository.getVendorById(vendorId);
  }
}

module.exports = GetVendorByIdUseCase;
