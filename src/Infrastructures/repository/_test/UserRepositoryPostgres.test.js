const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");
const pool = require("../../database/postgres/pool");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");

describe("UserRepositoryPostgres", () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verifyAvailableEmail function", () => {
    it("should throw InvariantError when email not available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: "dicoding@mail.com" });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail("dicoding@mail.com")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when email available", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail("dicoding@mail.com")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("addUser function", () => {
    it("should persist register user and return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        name: "dicoding",
        email: "dicoding@mail.com",
        password: "secret_password",
        role: "buyer",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById("user-123");
      expect(users).toHaveLength(1);
    });

    it("should return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        name: "dicoding",
        email: "dicoding@mail.com",
        password: "secret_password",
        role: "buyer",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(registeredUser).toBeInstanceOf(RegisteredUser);
      expect(registeredUser.id).toEqual("user-123");
      expect(registeredUser.name).toEqual(registerUser.name);
      expect(registeredUser.email).toEqual(registerUser.email);
      expect(registeredUser.role).toEqual(registerUser.role);
      expect(registeredUser.status).toEqual("active");
      expect(registeredUser.created_at).toBeDefined();
      expect(registeredUser.updated_at).toBeDefined();
    });
  });

  describe("getPasswordByEmail", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getPasswordByEmail("dicoding@mail.com")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user password when user is found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        email: "dicoding@mail.com",
        password: "secret_password",
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByEmail(
        "dicoding@mail.com"
      );
      expect(password).toBe("secret_password");
    });
  });

  describe("getIdByEmail", () => {
    it("should throw InvariantError when user not found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.getIdByEmail("dicoding@mail.com")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user id correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-321",
        email: "dicoding@mail.com",
      });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const userId = await userRepositoryPostgres.getIdByEmail(
        "dicoding@mail.com"
      );

      // Assert
      expect(userId).toEqual("user-321");
    });
  });

  describe("getUserStatus", () => {
    it("should throw InvariantError when user not found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.getUserStatus("user-123")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user status correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        status: "suspended",
      });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const status = await userRepositoryPostgres.getUserStatus("user-123");

      // Assert
      expect(status).toEqual("suspended");
    });
  });

  describe("getUserById", () => {
    it("should throw InvariantError when user not found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.getUserById("user-123")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user correctly", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      const userData = {
        id: "user-123",
        name: "dicoding",
        email: "dicoding@mail.com",
        role: "buyer",
        status: "active",
      };
      await UsersTableTestHelper.addUser(userData);

      // Action
      const user = await userRepositoryPostgres.getUserById("user-123");

      // Assert
      expect(user).toBeInstanceOf(RegisteredUser);
      expect(user.id).toEqual(userData.id);
      expect(user.name).toEqual(userData.name);
      expect(user.email).toEqual(userData.email);
      expect(user.role).toEqual(userData.role);
      expect(user.status).toEqual(userData.status);
      expect(user.created_at).toBeDefined();
      expect(user.updated_at).toBeDefined();
    });
  });
});
