class VendorRepository {
  async addVendor(newVendor) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyVendor(vendorId, verificationData) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async rejectVendor(vendorId, rejectionData) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteVendor(vendorId) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getVendorById(vendorId) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getVendorByName(vendorName) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateVendor(vendorId, updateVendor) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getVendors(params) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkVendorNameAvailability(name) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkVendorHasProducts(vendorId) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkVendorHasPendingOrders(vendorId) {
    throw new Error("VENDOR_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = VendorRepository;
