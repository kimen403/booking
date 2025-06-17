class NewVendor {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      address,
    } = payload;

    this.vendor_name = vendor_name;
    this.vendor_description = vendor_description || null;
    this.vendor_logo_url = vendor_logo_url || null;
    this.contact_number = contact_number || null;
    this.has_whatsapp = has_whatsapp || false;
    this.address = address ? this._verifyAddress(address) : {};
  }

  _verifyPayload({ vendor_name, has_whatsapp, address }) {
    if (!vendor_name || typeof vendor_name !== "string") {
      throw new Error("NEW_VENDOR.VENDOR_NAME_NOT_VALID");
    }

    if (has_whatsapp !== undefined && typeof has_whatsapp !== "boolean") {
      throw new Error("NEW_VENDOR.INVALID_HAS_WHATSAPP");
    }

    if (address !== undefined && typeof address !== "object") {
      throw new Error("NEW_VENDOR.INVALID_ADDRESS");
    }
  }

  _verifyAddress(address) {
    const { street, city, state, postal_code, country, latitude, longitude } =
      address;

    // All fields are optional, just return what's provided
    return {
      street: street || null,
      city: city || null,
      state: state || null,
      postal_code: postal_code || null,
      country: country || null,
      latitude: latitude || null,
      longitude: longitude || null,
    };
  }
}

module.exports = NewVendor;
