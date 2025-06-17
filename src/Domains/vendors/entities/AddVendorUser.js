class AddVendorUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { vendorId, userId, roleInVendor } = payload;

    this.vendorId = vendorId;
    this.userId = userId;
    this.roleInVendor = roleInVendor;
  }

  _verifyPayload({ vendorId, userId, roleInVendor }) {
    if (!vendorId || !userId || !roleInVendor) {
      throw new Error("ADD_VENDOR_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof vendorId !== "string" ||
      typeof userId !== "string" ||
      typeof roleInVendor !== "string"
    ) {
      throw new Error("ADD_VENDOR_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validRoles = ["owner", "manager", "staff"];
    if (!validRoles.includes(roleInVendor)) {
      throw new Error("ADD_VENDOR_USER.ROLE_NOT_VALID");
    }
  }
}

module.exports = AddVendorUser;
