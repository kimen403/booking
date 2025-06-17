const UserLogin = require("../UserLogin");

describe("UserLogin entities", () => {
  it("should throw error when payload does not contain needed property", () => {
    // Arrange
    const payload = {
      email: "dicoding@mail.com",
    };

    // Action and Assert
    expect(() => new UserLogin(payload)).toThrowError(
      "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload not meet data type specification", () => {
    // Arrange
    const payload = {
      email: 123,
      password: "abc",
    };

    // Action and Assert
    expect(() => new UserLogin(payload)).toThrowError(
      "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when email format is invalid", () => {
    // Arrange
    const payload = {
      email: "invalid-email",
      password: "abc",
    };

    // Action and Assert
    expect(() => new UserLogin(payload)).toThrowError(
      "USER_LOGIN.EMAIL_NOT_VALID"
    );
  });

  it("should create UserLogin entities correctly", () => {
    // Arrange
    const payload = {
      email: "dicoding@mail.com",
      password: "abc",
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.email).toEqual(payload.email);
    expect(userLogin.password).toEqual(payload.password);
  });
});
