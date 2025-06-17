class UpdateVendor {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      vendor_name,
      vendor_description,
      vendor_logo_url,
      contact_number,
      has_whatsapp,
      status,
      verification_notes,
      address,
    } = payload;

    this.vendor_name = vendor_name;
    this.vendor_description = vendor_description;
    this.vendor_logo_url = vendor_logo_url;
    this.contact_number = contact_number;
    this.has_whatsapp = has_whatsapp;
    this.status = status;
    this.verification_notes = verification_notes;
    this.address = this._verifyAddress(address);
  }

  _verifyPayload({
    vendor_name,
    vendor_description,
    contact_number,
    has_whatsapp,
    status,
    address,
  }) {
    if (!vendor_name) {
      throw new Error("UPDATE_VENDOR.VENDOR_NAME_NOT_PROVIDED");
    }

    if (!vendor_description) {
      throw new Error("UPDATE_VENDOR.VENDOR_DESCRIPTION_NOT_PROVIDED");
    }

    if (!contact_number) {
      throw new Error("UPDATE_VENDOR.CONTACT_NUMBER_NOT_PROVIDED");
    }

    if (typeof has_whatsapp !== "boolean") {
      throw new Error("UPDATE_VENDOR.INVALID_HAS_WHATSAPP");
    }

    if (
      status &&
      !["pending", "verified", "rejected", "deleted"].includes(status)
    ) {
      throw new Error("UPDATE_VENDOR.INVALID_STATUS");
    }

    if (!address) {
      throw new Error("UPDATE_VENDOR.ADDRESS_NOT_PROVIDED");
    }
  }

  _verifyAddress(address) {
    const { street, city, state, postal_code, country } = address;

    if (!street) {
      throw new Error("UPDATE_VENDOR.STREET_NOT_PROVIDED");
    }

    if (!city) {
      throw new Error("UPDATE_VENDOR.CITY_NOT_PROVIDED");
    }

    if (!state) {
      throw new Error("UPDATE_VENDOR.STATE_NOT_PROVIDED");
    }

    if (!postal_code) {
      throw new Error("UPDATE_VENDOR.POSTAL_CODE_NOT_PROVIDED");
    }

    if (!country) {
      throw new Error("UPDATE_VENDOR.COUNTRY_NOT_PROVIDED");
    }

    return {
      street,
      city,
      state,
      postal_code,
      country,
    };
  }
}

module.exports = UpdateVendor;
