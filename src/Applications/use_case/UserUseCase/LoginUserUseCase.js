const UserLogin = require("../../../Domains/users/entities/UserLogin");
const NewAuthentication = require("../../../Domains/authentications/entities/NewAuth");
const InvariantError = require("../../../Commons/exceptions/InvariantError");

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { email, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByEmail(
      email
    );
    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByEmail(email);

    // Check user status before allowing login
    // const status = await this._userRepository.getUserStatus(id);
    // if (status === "suspended") {
    //   throw new InvariantError("USER_LOGIN.USER_SUSPENDED");
    // }
    // if (status === "banned") {
    //   throw new InvariantError("USER_LOGIN.USER_BANNED");
    // }

    const user = await this._userRepository.getUserById(id);

    const accessToken =
      await this._authenticationTokenManager.createAccessToken({
        email,
        id,
        role: user.role,
      });
    const refreshToken =
      await this._authenticationTokenManager.createRefreshToken({
        email,
        id,
        role: user.role,
      });

    const newAuthentication = new NewAuthentication({
      id,
      email,
      role: user.role,
      name: user.name,
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
