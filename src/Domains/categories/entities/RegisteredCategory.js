class RegisteredCategory {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, name, created_at, updated_at } = payload;

    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  _verifyPayload({ id, name, created_at, updated_at }) {
    if (!id || !name || !created_at || !updated_at) {
      throw new Error("REGISTERED_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      !(created_at instanceof Date) ||
      !(updated_at instanceof Date)
    ) {
      throw new Error("REGISTERED_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = RegisteredCategory;
