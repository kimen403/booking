class UpdateUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, email, role } = payload;

    this.name = name;
    this.email = email;

    this.role = role;
  }

  _verifyPayload({ name, email, role }) {
    if (!name || !email || !role) {
      throw new Error("UPDATE_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string"
    ) {
      throw new Error("UPDATE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (name.length > 50) {
      throw new Error("UPDATE_USER.NAME_LIMIT_CHAR");
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("UPDATE_USER.EMAIL_NOT_VALID");
    }

    const validRoles = ["admin", "seller", "buyer"];
    if (!validRoles.includes(role)) {
      throw new Error("UPDATE_USER.ROLE_NOT_VALID");
    }
  }
}

module.exports = UpdateUser;
