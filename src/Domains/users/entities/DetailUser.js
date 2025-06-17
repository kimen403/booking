class DetailUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, name, email, role, status } = payload;

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
  }

  _verifyPayload({ id, name, email, role, status }) {
    if (!id || !name || !email || !role || !status) {
      throw new Error("DETAIL_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      typeof status !== "string"
    ) {
      throw new Error("DETAIL_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailUser;
