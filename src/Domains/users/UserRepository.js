class UserRepository {
  async addUser(registerUser) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableEmail(email) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getPasswordByEmail(email) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getIdByEmail(email) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserStatus(userId) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserById(userId) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getAllUsers() {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateUser(id, updatedUser) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteUser(id) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateUserStatus(userId, status) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = UserRepository;
