const VendorRepository = require("../../Domains/vendors/VendorRepository");
const RegisteredVendor = require("../../Domains/vendors/entities/RegisteredVendor");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class VendorRepositoryPrisma extends VendorRepository {
  constructor(prisma, idGenerator) {
    super();
    this._prisma = prisma;
    this._idGenerator = idGenerator;
  }

  async addVendor(newVendor) {
    const {
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      address,
    } = newVendor;

    const id = `vendor-${this._idGenerator()}`;
    const status = "pending";

    try {
      const vendor = await this._prisma.vendor.create({
        data: {
          id,
          vendor_name,
          vendor_description,
          vendor_logo_url,
          contact_number,
          has_whatsapp,
          status,
          street: address?.street,
          city: address?.city,
          state: address?.state,
          postal_code: address?.postal_code,
          country: address?.country,
          latitude: address?.latitude,
          longitude: address?.longitude,
        },
      });

      return vendor;
    } catch (error) {
      console.log("Error in addVendor:", error);
    }
  }

  async verifyVendor(vendorId) {
    const verified_at = new Date();

    const result = await this._prisma.vendor.update({
      where: { id: vendorId },
      data: {
        status: "verified",
        verified_at,
      },
    });

    if (!result) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result);
  }

  async rejectVendor(vendorId) {
    const result = await this._prisma.vendor.update({
      where: { id: vendorId },
      data: {
        status: "rejected",
      },
    });

    if (!result) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result);
  }

  async deleteVendor(vendorId) {
    try {
      await this._prisma.vendor.update({
        where: { id: vendorId },
        data: { status: "deleted" },
      });
    } catch (error) {
      throw new NotFoundError("vendor tidak ditemukan");
    }
  }

  async getVendorById(vendorId) {
    const result = await this._prisma.vendor.findFirst({
      where: {
        id: vendorId,
        status: { not: "deleted" },
      },
    });

    if (!result) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(this._mapVendorToResponse(result));
  }

  async getVendorByName(vendorName) {
    const result = await this._prisma.vendor.findFirst({
      where: {
        vendor_name: vendorName,
        status: { not: "deleted" },
      },
    });

    if (!result) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(this._mapVendorToResponse(result));
  }

  async updateVendor(vendorId, updateVendor) {
    const {
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      status,
      verification_notes,
      address,
    } = updateVendor;

    const result = await this._prisma.vendor.update({
      where: { id: vendorId },
      data: {
        vendor_name,
        vendor_description,
        vendor_logo_url,
        contact_number,
        has_whatsapp,
        status: status || undefined,
        verification_notes: verification_notes || undefined,
        street: address?.street,
        city: address?.city,
        state: address?.state,
        postal_code: address?.postal_code,
        country: address?.country,
        latitude: address?.latitude,
        longitude: address?.longitude,
      },
    });

    if (!result) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(this._mapVendorToResponse(result));
  }

  async getVendors({ page = 1, per_page = 10, status, owner_id, name }) {
    const skip = (page - 1) * per_page;
    const where = {
      status: { not: "deleted" },
    };

    if (status) {
      where.status = status;
    }

    if (owner_id) {
      where.owner_id = owner_id;
    }

    if (name) {
      where.vendor_name = {
        contains: name,
        mode: "insensitive",
      };
    }

    const [vendors, total] = await Promise.all([
      this._prisma.vendor.findMany({
        where,
        orderBy: { created_at: "desc" },
        take: parseInt(per_page),
        skip,
      }),
      this._prisma.vendor.count({ where }),
    ]);

    const total_pages = Math.ceil(total / per_page);

    return {
      vendors: vendors.map(
        (vendor) => new RegisteredVendor(this._mapVendorToResponse(vendor))
      ),
      pagination: {
        total,
        total_pages,
        per_page: parseInt(per_page),
        current_page: parseInt(page),
      },
    };
  }

  async checkVendorNameAvailability(name) {
    const vendor = await this._prisma.vendor.findFirst({
      where: {
        vendor_name: name,
        status: { not: "deleted" },
      },
    });

    if (vendor) {
      throw new InvariantError("nama vendor tidak tersedia");
    }
  }

  async checkUserIdAvailability(userId) {
    const user = await this._prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new InvariantError("user tidak ditemukan");
    }

    return user;
  }

  _mapVendorToResponse(vendor) {
    const {
      street,
      city,
      state,
      postal_code,
      country,
      latitude,
      longitude,
      ...otherData
    } = vendor;

    return {
      ...otherData,
      address: {
        street,
        city,
        state,
        postal_code,
        country,
        latitude,
        longitude,
      },
    };
  }
}

module.exports = VendorRepositoryPrisma;
