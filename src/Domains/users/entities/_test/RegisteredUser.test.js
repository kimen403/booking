const RegisteredUser = require("../RegisteredUser");

describe("a RegisteredUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      name: "dicoding",
      email: "dicoding@mail.com",
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      name: "dicoding",
      email: true,
      role: {},
      status: null,
      created_at: "not-a-date",
      updated_at: "not-a-date",
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when role is invalid", () => {
    // Arrange
    const payload = {
      id: "user-123",
      name: "dicoding",
      email: "dicoding@mail.com",
      role: "invalid-role",
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.ROLE_NOT_VALID"
    );
  });

  it("should throw error when status is invalid", () => {
    // Arrange
    const payload = {
      id: "user-123",
      name: "dicoding",
      email: "dicoding@mail.com",
      role: "buyer",
      status: "invalid-status",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.STATUS_NOT_VALID"
    );
  });

  it("should create registeredUser object correctly", () => {
    // Arrange
    const payload = {
      id: "user-123",
      name: "dicoding",
      email: "dicoding@mail.com",
      role: "buyer",
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.name).toEqual(payload.name);
    expect(registeredUser.email).toEqual(payload.email);
    expect(registeredUser.role).toEqual(payload.role);
    expect(registeredUser.status).toEqual(payload.status);
    expect(registeredUser.created_at).toEqual(payload.created_at);
    expect(registeredUser.updated_at).toEqual(payload.updated_at);
  });
});
