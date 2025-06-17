/* istanbul ignore file */
const prisma = require("../src/Infrastructures/database/prisma");

const VendorUsersPrismaTestHelper = {
  async addVendorUser({
    vendor_id = "vendor-123",
    user_id = "user-123",
    role_in_vendor = "owner",
    created_at = new Date(),
  }) {
    await prisma.vendorUser.create({
      data: {
        vendor_id,
        user_id,
        role_in_vendor,
        created_at,
      },
    });
  },

  async findVendorUserById(vendor_id, user_id) {
    const result = await prisma.vendorUser.findUnique({
      where: {
        vendor_id_user_id: {
          vendor_id,
          user_id,
        },
      },
    });
    return result;
  },

  async getVendorUsers(vendor_id) {
    return await prisma.vendorUser.findMany({
      where: { vendor_id },
      include: {
        user: true,
      },
    });
  },

  async getUserVendors(user_id) {
    return await prisma.vendorUser.findMany({
      where: { user_id },
      include: {
        vendor: true,
      },
    });
  },

  async cleanTable() {
    await prisma.vendorUser.deleteMany({});
  },
};

module.exports = VendorUsersPrismaTestHelper;
