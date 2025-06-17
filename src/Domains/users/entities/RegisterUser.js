class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name, email, password, role } = payload;

    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = "active";
  }

  _verifyPayload({ name, email, password, role }) {
    if (!name || !email || !password || !role) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof role !== "string"
    ) {
      throw new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (name.length > 50) {
      throw new Error("REGISTER_USER.NAME_LIMIT_CHAR");
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("REGISTER_USER.EMAIL_NOT_VALID");
    }

    const validRoles = ["admin", "vendor", "client", "superadmin"];
    console.log(role, validRoles);
    if (!validRoles.includes(role)) {
      throw new Error("REGISTER_USER.ROLE_NOT_VALID");
    }
  }
}

module.exports = RegisterUser;
