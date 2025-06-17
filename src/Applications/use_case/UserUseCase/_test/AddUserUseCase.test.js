const RegisterUser = require("../../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../../Domains/users/entities/RegisteredUser");
const UserRepository = require("../../../../Domains/users/UserRepository");
const PasswordHash = require("../../../security/PasswordHash");
const AddUserUseCase = require("../AddUserUseCase");

describe("AddUserUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the add user action correctly", async () => {
    // Arrange
    const useCasePayload = {
      name: "Dicoding Indonesia",
      email: "dicoding@mail.com",
      password: "secret",
      role: "buyer",
    };

    const expectedRegisteredUser = new RegisteredUser({
      id: "user-123",
      name: useCasePayload.name,
      email: useCasePayload.email,
      role: useCasePayload.role,
      status: "active",
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    /** mocking needed function */
    mockUserRepository.verifyAvailableEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockUserRepository.addUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredUser));

    /** creating use case instance */
    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registeredUser = await getUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableEmail).toBeCalledWith(
      useCasePayload.email
    );
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(
      new RegisterUser({
        name: useCasePayload.name,
        email: useCasePayload.email,
        password: "encrypted_password",
        role: useCasePayload.role,
      })
    );
  });
});
