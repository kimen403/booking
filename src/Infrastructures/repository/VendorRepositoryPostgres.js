const VendorRepository = require("../../Domains/vendors/VendorRepository");
const RegisteredVendor = require("../../Domains/vendors/entities/RegisteredVendor");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class VendorRepositoryPostgres extends VendorRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addVendor(newVendor) {
    const {
      owner_id,
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      address,
    } = newVendor;
    console.log("postgres addVendor", newVendor);
    const id = `vendor-${this._idGenerator()}`;
    const status = "pending";

    const query = {
      text: "INSERT INTO vendors (id, owner_id, vendor_name, vendor_description, vendor_logo_url, contact_number, has_whatsapp, status, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, owner_id, vendor_name, vendor_description, vendor_logo_url, contact_number, has_whatsapp, status, address, created_at, updated_at",
      values: [
        id,
        owner_id,
        vendor_name,
        vendor_description,
        vendor_logo_url,
        contact_number,
        has_whatsapp,
        status,
        address,
      ],
    };
    try {
      const result = await this._pool.query(query);
    } catch (error) {
      console.log("Error in addVendor:", error);
    }
  }

  async verifyVendor(vendorId, verificationData) {
    const { verified_by, verification_notes } = verificationData;
    const verification_at = new Date().toISOString();

    const query = {
      text: "UPDATE vendors SET status = $1, verified_by = $2, verification_notes = $3, verification_at = $4 WHERE id = $5 RETURNING id, owner_id, vendor_name, vendor_description, vendor_logo_url, contact_number, has_whatsapp, status, address, verification_notes, verified_by, verification_at, created_at, updated_at",
      values: [
        "verified",
        verified_by,
        verification_notes,
        verification_at,
        vendorId,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result.rows[0]);
  }

  async rejectVendor(vendorId, rejectionData) {
    const { verified_by, verification_notes } = rejectionData;
    const verification_at = new Date().toISOString();

    const query = {
      text: "UPDATE vendors SET status = $1, verified_by = $2, verification_notes = $3, verification_at = $4 WHERE id = $5 RETURNING id, owner_id, vendor_name, vendor_description, vendor_logo_url, contact_number, has_whatsapp, status, address, verification_notes, verified_by, verification_at, created_at, updated_at",
      values: [
        "rejected",
        verified_by,
        verification_notes,
        verification_at,
        vendorId,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result.rows[0]);
  }

  async deleteVendor(vendorId) {
    const query = {
      text: "UPDATE vendors SET status = $1 WHERE id = $2 RETURNING id",
      values: ["deleted", vendorId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }
  }

  async getVendorById(vendorId) {
    const query = {
      text: "SELECT * FROM vendors WHERE id = $1 AND status != $2",
      values: [vendorId, "deleted"],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result.rows[0]);
  }

  async getVendorByName(vendorName) {
    const query = {
      text: "SELECT * FROM vendors WHERE vendor_name = $1 AND status != $2",
      values: [vendorName, "deleted"],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result.rows[0]);
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

    const query = {
      text: "UPDATE vendors SET vendor_name = $1, vendor_description = $2, vendor_logo_url = $3, contact_number = $4, has_whatsapp = $5, status = COALESCE($6, status), verification_notes = COALESCE($7, verification_notes), address = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING id, owner_id, vendor_name, vendor_description, vendor_logo_url, contact_number, has_whatsapp, status, address, verification_notes, verified_by, verification_at, created_at, updated_at",
      values: [
        vendor_name,
        vendor_description,
        vendor_logo_url,
        contact_number,
        has_whatsapp,
        status,
        verification_notes,
        address,
        vendorId,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("vendor tidak ditemukan");
    }

    return new RegisteredVendor(result.rows[0]);
  }

  async getVendors({ page = 1, per_page = 10, status, owner_id, name }) {
    const offset = (page - 1) * per_page;
    let query = "SELECT * FROM vendors WHERE status != $1";
    const values = ["deleted"];
    let countQuery = "SELECT COUNT(*) FROM vendors WHERE status != $1";

    if (status) {
      query += ` AND status = $${values.length + 1}`;
      countQuery += ` AND status = $${values.length + 1}`;
      values.push(status);
    }

    if (owner_id) {
      query += ` AND owner_id = $${values.length + 1}`;
      countQuery += ` AND owner_id = $${values.length + 1}`;
      values.push(owner_id);
    }

    if (name) {
      query += ` AND vendor_name ILIKE $${values.length + 1}`;
      countQuery += ` AND vendor_name ILIKE $${values.length + 1}`;
      values.push(`%${name}%`);
    }

    query +=
      " ORDER BY created_at DESC LIMIT $" +
      (values.length + 1) +
      " OFFSET $" +
      (values.length + 2);
    values.push(per_page, offset);

    const [vendors, count] = await Promise.all([
      this._pool.query(query, values),
      this._pool.query(countQuery, values.slice(0, -2)),
    ]);

    const total = parseInt(count.rows[0].count);
    const total_pages = Math.ceil(total / per_page);

    return {
      vendors: vendors.rows.map((vendor) => new RegisteredVendor(vendor)),
      pagination: {
        total,
        total_pages,
        per_page: parseInt(per_page),
        current_page: parseInt(page),
      },
    };
  }

  async checkVendorNameAvailability(name) {
    const query = {
      text: "SELECT 1 FROM vendors WHERE vendor_name = $1 AND status != $2",
      values: [name, "deleted"],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("nama vendor tidak tersedia");
    }
  }

  async checkUserIdAvailability(userId) {
    const query = {
      text: "SELECT 1 FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }
    return result.rows[0];
  }
}

module.exports = VendorRepositoryPostgres;
