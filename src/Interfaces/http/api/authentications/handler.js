const autoBind = require("auto-bind");
const LoginUserUseCase = require("../../../../Applications/use_case/UserUseCase/LoginUserUseCase");
const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase");
const LogoutUserUseCase = require("../../../../Applications/use_case/UserUseCase/LogoutUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    console.log("postAuthenticationHandler", request.payload);
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const newAuth = await loginUserUseCase.execute(request.payload);
    const response = h.response({
      status: "success",
      data: newAuth,
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name
    );
    const accessToken = await refreshAuthenticationUseCase.execute(
      request.payload
    );

    return {
      status: "success",
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const logoutUserUseCase = this._container.getInstance(
      LogoutUserUseCase.name
    );
    await logoutUserUseCase.execute(request.payload);
    return {
      status: "success",
    };
  }
}

module.exports = AuthenticationsHandler;
