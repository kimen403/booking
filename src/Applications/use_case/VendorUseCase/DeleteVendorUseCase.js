class DeleteVendorUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(vendorId) {
    // Check if vendor has any products
    const hasProducts = await this._vendorRepository.checkVendorHasProducts(
      vendorId
    );
    if (hasProducts) {
      throw new Error("DELETE_VENDOR_USE_CASE.VENDOR_HAS_PRODUCTS");
    }

    // Check if vendor has pending orders
    const hasPendingOrders =
      await this._vendorRepository.checkVendorHasPendingOrders(vendorId);
    if (hasPendingOrders) {
      throw new Error("DELETE_VENDOR_USE_CASE.VENDOR_HAS_PENDING_ORDERS");
    }

    await this._vendorRepository.deleteVendor(vendorId);
  }
}

module.exports = DeleteVendorUseCase;
