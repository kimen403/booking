class VendorUserRepository {
  async addVendorUser(vendorId, userId, roleInVendor) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async addOwner(vendorId, ownerId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async addVerifier(vendorId, verifierId, notes) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getVendorUsers(vendorId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserVendors(userId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserRoleInVendor(vendorId, userId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateUserRole(vendorId, userId, newRole) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async removeVendorUser(vendorId, userId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyVendorUser(vendorId, userId) {
    throw new Error("VENDOR_USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = VendorUserRepository;
