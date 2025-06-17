const VendorUserRepository = require("../../Domains/vendors/VendorUserRepository");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class VendorUserRepositoryPrisma extends VendorUserRepository {
  constructor(prisma) {
    super();
    this._prisma = prisma;
  }

  async addVendorUser(vendorId, userId, roleInVendor) {
    try {
      await this._prisma.vendorUser.create({
        data: {
          vendor_id: vendorId,
          user_id: userId,
          role_in_vendor: roleInVendor,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        throw new InvariantError("User sudah terdaftar di vendor ini");
      }
      throw error;
    }
  }

  async getVendorUsers(vendorId) {
    const vendorUsers = await this._prisma.vendorUser.findMany({
      where: { vendor_id: vendorId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
      },
    });

    return vendorUsers.map(({ user, role_in_vendor, created_at }) => ({
      ...user,
      role_in_vendor,
      joined_at: created_at,
    }));
  }

  async getUserVendors(userId) {
    const userVendors = await this._prisma.vendorUser.findMany({
      where: { user_id: userId },
      include: {
        vendor: true,
      },
    });

    return userVendors.map(({ vendor, role_in_vendor, created_at }) => ({
      ...vendor,
      role_in_vendor,
      joined_at: created_at,
    }));
  }

  async getUserRoleInVendor(vendorId, userId) {
    const vendorUser = await this._prisma.vendorUser.findUnique({
      where: {
        vendor_id_user_id: {
          vendor_id: vendorId,
          user_id: userId,
        },
      },
    });

    if (!vendorUser) {
      throw new NotFoundError("User tidak terdaftar di vendor ini");
    }

    return {
      role: vendorUser.role_in_vendor,
      verification_notes: vendorUser.verification_notes,
    };
  }

  async addVerifier(vendorId, verifierId, notes) {
    try {
      const verifier = await this._prisma.vendorUser.create({
        data: {
          vendor_id: vendorId,
          user_id: verifierId,
          role_in_vendor: "verifier",
          verification_notes: notes,
        },
      });

      await this._prisma.vendor.update({
        where: { id: vendorId },
        data: {
          verified_at: new Date(),
        },
      });

      return verifier;
    } catch (error) {
      if (error.code === "P2002") {
        throw new InvariantError("User sudah terdaftar di vendor ini");
      }
      throw error;
    }
  }

  async addOwner(vendorId, ownerId) {
    try {
      return await this._prisma.vendorUser.create({
        data: {
          vendor_id: vendorId,
          user_id: ownerId,
          role_in_vendor: "owner",
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        throw new InvariantError("User sudah terdaftar di vendor ini");
      }
      throw error;
    }
  }

  async updateUserRole(vendorId, userId, newRole) {
    try {
      await this._prisma.vendorUser.update({
        where: {
          vendor_id_user_id: {
            vendor_id: vendorId,
            user_id: userId,
          },
        },
        data: {
          role_in_vendor: newRole,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundError("User tidak terdaftar di vendor ini");
      }
      throw error;
    }
  }

  async removeVendorUser(vendorId, userId) {
    try {
      await this._prisma.vendorUser.delete({
        where: {
          vendor_id_user_id: {
            vendor_id: vendorId,
            user_id: userId,
          },
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundError("User tidak terdaftar di vendor ini");
      }
      throw error;
    }
  }

  async verifyVendorUser(vendorId, userId) {
    const vendorUser = await this._prisma.vendorUser.findUnique({
      where: {
        vendor_id_user_id: {
          vendor_id: vendorId,
          user_id: userId,
        },
      },
    });

    if (!vendorUser) {
      throw new NotFoundError("User tidak terdaftar di vendor ini");
    }

    return vendorUser;
  }
}

module.exports = VendorUserRepositoryPrisma;
