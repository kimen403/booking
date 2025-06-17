const UserRepository = require("../../../../Domains/users/UserRepository");
const AuthenticationRepository = require("../../../../Domains/authentications/AuthenticationRepository");
const AuthenticationTokenManager = require("../../../security/AuthenticationTokenManager");
const PasswordHash = require("../../../security/PasswordHash");
const LoginUserUseCase = require("../LoginUserUseCase");
const NewAuth = require("../../../../Domains/authentications/entities/NewAuth");
const InvariantError = require("../../../../Commons/exceptions/InvariantError");

describe("GetAuthenticationUseCase", () => {
  it("should orchestrating the get authentication action correctly", async () => {
    // Arrange
    const useCasePayload = {
      email: "dicoding@mail.com",
      password: "secret",
    };
    const mockedAuthentication = new NewAuth({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });
    const expectedUser = {
      id: "user-123",
      email: "dicoding@mail.com",
      role: "buyer",
      status: "active",
    };
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.comparePassword = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockUserRepository.getUserStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve("active"));
    mockUserRepository.getUserById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedUser));
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockedAuthentication.accessToken)
      );
    mockAuthenticationTokenManager.createRefreshToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockedAuthentication.refreshToken)
      );
    mockAuthenticationRepository.addToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(
      new NewAuth({
        accessToken: "access_token",
        refreshToken: "refresh_token",
      })
    );
    expect(mockUserRepository.getPasswordByEmail).toBeCalledWith(
      "dicoding@mail.com"
    );
    expect(mockPasswordHash.comparePassword).toBeCalledWith(
      "secret",
      "encrypted_password"
    );
    expect(mockUserRepository.getIdByEmail).toBeCalledWith("dicoding@mail.com");
    expect(mockUserRepository.getUserStatus).toBeCalledWith("user-123");
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      email: "dicoding@mail.com",
      id: "user-123",
      role: "buyer",
    });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({
      email: "dicoding@mail.com",
      id: "user-123",
      role: "buyer",
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(
      mockedAuthentication.refreshToken
    );
  });

  it("should throw error when user status is suspended", async () => {
    // Arrange
    const useCasePayload = {
      email: "dicoding@mail.com",
      password: "secret",
    };
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.comparePassword = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockUserRepository.getUserStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve("suspended"));

    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action & Assert
    await expect(loginUserUseCase.execute(useCasePayload)).rejects.toThrow(
      InvariantError
    );
  });
});
