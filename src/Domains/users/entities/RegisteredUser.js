class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, name, email, role, status, created_at, updated_at } = payload;

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  _verifyPayload({ id, name, email, role, status, created_at, updated_at }) {
    if (
      !id ||
      !name ||
      !email ||
      !role ||
      !status ||
      !created_at ||
      !updated_at
    ) {
      throw new Error("REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      typeof status !== "string" ||
      !(created_at instanceof Date) ||
      !(updated_at instanceof Date)
    ) {
      throw new Error("REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validStatus = ["active", "suspended", "banned"];
    if (!validStatus.includes(status)) {
      throw new Error("REGISTERED_USER.STATUS_NOT_VALID");
    }
  }
}

module.exports = RegisteredUser;
