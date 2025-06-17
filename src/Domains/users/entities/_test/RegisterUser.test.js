const RegisterUser = require("../RegisterUser");

describe("a RegisterUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      name: "abc",
      password: "abc",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      name: 123,
      email: true,
      password: "abc",
      role: {},
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when name contains more than 50 character", () => {
    // Arrange
    const payload = {
      name: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
      email: "dicoding@mail.com",
      password: "abc",
      role: "buyer",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.NAME_LIMIT_CHAR"
    );
  });

  it("should throw error when email format is invalid", () => {
    // Arrange
    const payload = {
      name: "dicoding",
      email: "invalid-email",
      password: "abc",
      role: "buyer",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.EMAIL_NOT_VALID"
    );
  });

  it("should throw error when role is invalid", () => {
    // Arrange
    const payload = {
      name: "dicoding",
      email: "dicoding@mail.com",
      password: "abc",
      role: "invalid-role",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.ROLE_NOT_VALID"
    );
  });

  it("should create registerUser object correctly", () => {
    // Arrange
    const payload = {
      name: "dicoding",
      email: "dicoding@mail.com",
      password: "abc",
      role: "buyer",
    };

    // Action
    const registerUser = new RegisterUser(payload);

    // Assert
    expect(registerUser.name).toEqual(payload.name);
    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.password).toEqual(payload.password);
    expect(registerUser.role).toEqual(payload.role);
    expect(registerUser.status).toEqual("active");
  });
});
