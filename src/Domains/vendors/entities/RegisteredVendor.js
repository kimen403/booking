class RegisteredVendor {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      owner_id,
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      status,
      address,
      verification_notes,
      verified_by,
      verification_at,
      created_at,
      updated_at,
    } = payload;

    this.id = id;
    this.owner_id = owner_id;
    this.vendor_name = vendor_name;
    this.vendor_description = vendor_description;
    this.vendor_logo_url = vendor_logo_url;
    this.contact_number = contact_number;
    this.has_whatsapp = has_whatsapp;
    this.status = status;
    this.address = this._verifyAddress(address);
    this.verification_notes = verification_notes;
    this.verified_by = verified_by;
    this.verification_at = verification_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  _verifyPayload({
    id,
    owner_id,
    vendor_name,
    vendor_description,
    contact_number,
    has_whatsapp,
    status,
    address,
  }) {
    if (!id) {
      throw new Error("REGISTERED_VENDOR.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (!owner_id) {
      throw new Error("REGISTERED_VENDOR.OWNER_ID_NOT_PROVIDED");
    }

    if (!vendor_name) {
      throw new Error("REGISTERED_VENDOR.VENDOR_NAME_NOT_PROVIDED");
    }

    if (!vendor_description) {
      throw new Error("REGISTERED_VENDOR.VENDOR_DESCRIPTION_NOT_PROVIDED");
    }

    if (!contact_number) {
      throw new Error("REGISTERED_VENDOR.CONTACT_NUMBER_NOT_PROVIDED");
    }

    if (typeof has_whatsapp !== "boolean") {
      throw new Error("REGISTERED_VENDOR.INVALID_HAS_WHATSAPP");
    }

    if (!["pending", "verified", "rejected", "deleted"].includes(status)) {
      throw new Error("REGISTERED_VENDOR.INVALID_STATUS");
    }

    if (!address || typeof address !== "object") {
      throw new Error("REGISTERED_VENDOR.ADDRESS_NOT_PROVIDED");
    }
  }

  _verifyAddress(address) {
    const requiredFields = [
      "street",
      "city",
      "state",
      "postal_code",
      "country",
    ];

    for (const field of requiredFields) {
      if (!address[field]) {
        throw new Error(
          `REGISTERED_VENDOR.${field.toUpperCase()}_NOT_PROVIDED`
        );
      }

      if (typeof address[field] !== "string") {
        throw new Error(`REGISTERED_VENDOR.INVALID_${field.toUpperCase()}`);
      }
    }

    return {
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    };
  }
}

module.exports = RegisteredVendor;
