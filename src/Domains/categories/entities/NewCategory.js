class NewCategory {
  constructor(payload) {
    this._verifyPayload(payload);

    const { name } = payload;

    this.name = name;
  }

  _verifyPayload({ name }) {
    if (!name) {
      throw new Error("NEW_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof name !== "string") {
      throw new Error("NEW_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (name.length > 50) {
      throw new Error("NEW_CATEGORY.NAME_LIMIT_CHAR");
    }
  }
}

module.exports = NewCategory;
