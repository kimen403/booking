/* istanbul ignore file */
const prisma = require("../src/Infrastructures/database/prisma");

const VendorsPrismaTestHelper = {
  async addVendor({
    id = "vendor-123",
    owner_id = "user-123",
    vendor_name = "Vendor Test",
    vendor_description = "Test Description",
    vendor_logo_url = "http://example.com/logo.png",
    contact_number = "1234567890",
    has_whatsapp = true,
    status = "pending",
    street = "Test Street",
    city = "Test City",
    state = "Test State",
    postal_code = "12345",
    country = "Test Country",
    latitude = 0,
    longitude = 0,
    verification_notes = null,
    verified_by = null,
    verification_at = null,
    created_at = new Date(),
    updated_at = new Date(),
  }) {
    await prisma.vendor.create({
      data: {
        id,
        owner_id,
        vendor_name,
        vendor_description,
        vendor_logo_url,
        contact_number,
        has_whatsapp,
        status,
        street,
        city,
        state,
        postal_code,
        country,
        latitude,
        longitude,
        verification_notes,
        verified_by,
        verification_at,
        created_at,
        updated_at,
      },
    });
  },

  async findVendorById(id) {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });
    return vendor ? [vendor] : [];
  },

  async findVendorByName(vendor_name) {
    const vendor = await prisma.vendor.findUnique({
      where: { vendor_name },
    });
    return vendor ? [vendor] : [];
  },

  async findVendorsByOwnerId(owner_id) {
    const vendors = await prisma.vendor.findMany({
      where: { owner_id },
    });
    return vendors;
  },

  async verifyVendor({
    id,
    verified_by,
    verification_notes = "Verified",
    status = "verified",
  }) {
    await prisma.vendor.update({
      where: { id },
      data: {
        status,
        verified_by,
        verification_notes,
        verification_at: new Date(),
      },
    });
  },

  async cleanTable() {
    await prisma.vendor.deleteMany({});
  },
};

module.exports = VendorsPrismaTestHelper;
