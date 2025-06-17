/* istanbul ignore file */

const { createContainer } = require("instances-container");

// external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const Jwt = require("@hapi/jwt");

// service (repository, helper, manager, etc)
const prisma = require("./database/prisma");
const PasswordHash = require("../Applications/security/PasswordHash");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
//authenticationRepository
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryPrisma = require("./repository/AuthenticationRepositoryPrisma");
//userRepository
const UserRepository = require("../Domains/users/UserRepository");
const UserRepositoryPrisma = require("./repository/UserRepositoryPrisma");
//categoryRepository
const CategoryRepository = require("../Domains/categories/CategoryRepository");
const CategoryRepositoryPrisma = require("./repository/CategoryRepositoryPrisma");
//settingsRepository

//vendorRepository
const VendorRepository = require("../Domains/vendors/VendorRepository");
const VendorRepositoryPrisma = require("./repository/VendorRepositoryPrisma");
const VendorUserRepository = require("../Domains/vendors/VendorUserRepository");
const VendorUserRepositoryPrisma = require("./repository/VendorUserRepositoryPrisma");

// use case
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const JwtTokenManager = require("./security/JwtTokenManager");
const RefreshAuthenticationUseCase = require("../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase");
//userUseCase
const AddUserUseCase = require("../Applications/use_case/UserUseCase/AddUserUseCase");
const LoginUserUseCase = require("../Applications/use_case/UserUseCase/LoginUserUseCase");
const LogoutUserUseCase = require("../Applications/use_case/UserUseCase/LogoutUserUseCase");
const GetAllUsersUseCase = require("../Applications/use_case/UserUseCase/GetAllUsersUseCase");
const GetUserByIdUseCase = require("../Applications/use_case/UserUseCase/GetUserByIdUseCase");
const UpdateUserUseCase = require("../Applications/use_case/UserUseCase/UpdateUserUseCase");
const DeleteUserUseCase = require("../Applications/use_case/UserUseCase/DeleteUserUseCase");
const SuspendUserUseCase = require("../Applications/use_case/UserUseCase/SuspendUserUseCase");
const BanUserUseCase = require("../Applications/use_case/UserUseCase/BanUserUseCase");
const ActivateUserUseCase = require("../Applications/use_case/UserUseCase/ActivateUserUseCase");
const CheckUserAvailabilityUseCase = require("../Applications/use_case/UserUseCase/CheckUserAvailabilityUseCase");
//categoryUseCase
const AddCategoryUseCase = require("../Applications/use_case/CategoryUseCase/AddCategoryUseCase");
const GetAllCategoriesUseCase = require("../Applications/use_case/CategoryUseCase/GetAllCategoriesUseCase");
const GetCategoryByIdUseCase = require("../Applications/use_case/CategoryUseCase/GetCategoryByIdUseCase");
const UpdateCategoryUseCase = require("../Applications/use_case/CategoryUseCase/UpdateCategoryUseCase");
const DeleteCategoryUseCase = require("../Applications/use_case/CategoryUseCase/DeleteCategoryUseCase");
//vendorUseCase
const AddVendorUseCase = require("../Applications/use_case/VendorUseCase/AddVendorUseCase");
const AddVendorUserUseCase = require("../Applications/use_case/VendorUseCase/AddVendorUserUseCase");
const GetVendorUsersUseCase = require("../Applications/use_case/VendorUseCase/GetVendorUsersUseCase");
const GetUserVendorsUseCase = require("../Applications/use_case/VendorUseCase/GetUserVendorsUseCase");
const UpdateVendorUserUseCase = require("../Applications/use_case/VendorUseCase/UpdateVendorUserUseCase");
const RemoveVendorUserUseCase = require("../Applications/use_case/VendorUseCase/RemoveVendorUserUseCase");
const GetAllVendorsUseCase = require("../Applications/use_case/VendorUseCase/GetAllVendorsUseCase");
const VerifyVendorUseCase = require("../Applications/use_case/VendorUseCase/VerifyVendorUseCase");
const CheckVendorNameAvailabilityUseCase = require("../Applications/use_case/VendorUseCase/CheckVendorNameAvailabilityUseCase");
const DeleteVendorUseCase = require("../Applications/use_case/VendorUseCase/DeleteVendorUseCase");
const GetVendorByIdUseCase = require("../Applications/use_case/VendorUseCase/GetVendorByIdUseCase");
const UpdateVendorUseCase = require("../Applications/use_case/VendorUseCase/UpdateVendorUseCase");
const RejectVendorUseCase = require("../Applications/use_case/VendorUseCase/RejectVendorUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  //userRepository
  {
    key: UserRepository.name,
    Class: UserRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  //categoryRepository
  {
    key: CategoryRepository.name,
    Class: CategoryRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },

  //vendorRepository
  {
    key: VendorRepository.name,
    Class: VendorRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  //vendorUserRepository
  {
    key: VendorUserRepository.name,
    Class: VendorUserRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
      ],
    },
  },
  //productRepository

  //authenticationRepository
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
      ],
    },
  },
  //passwordHash
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  //authenticationTokenManager
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  //addUserUseCase
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  //loginUserUseCase
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  //logoutUserUseCase
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  //refreshAuthenticationUseCase
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  //getAllUsersUseCase
  {
    key: GetAllUsersUseCase.name,
    Class: GetAllUsersUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //getUserByIdUseCase
  {
    key: GetUserByIdUseCase.name,
    Class: GetUserByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //updateUserUseCase
  {
    key: UpdateUserUseCase.name,
    Class: UpdateUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  //deleteUserUseCase
  {
    key: DeleteUserUseCase.name,
    Class: DeleteUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //suspendUserUseCase
  {
    key: SuspendUserUseCase.name,
    Class: SuspendUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //banUserUseCase
  {
    key: BanUserUseCase.name,
    Class: BanUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //activateUserUseCase
  {
    key: ActivateUserUseCase.name,
    Class: ActivateUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //checkUserAvailabilityUseCase
  {
    key: CheckUserAvailabilityUseCase.name,
    Class: CheckUserAvailabilityUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //addCategoryUseCase
  {
    key: AddCategoryUseCase.name,
    Class: AddCategoryUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "categoryRepository",
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  //getAllCategoriesUseCase
  {
    key: GetAllCategoriesUseCase.name,
    Class: GetAllCategoriesUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "categoryRepository",
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  //getCategoryByIdUseCase
  {
    key: GetCategoryByIdUseCase.name,
    Class: GetCategoryByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "categoryRepository",
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  //updateCategoryUseCase
  {
    key: UpdateCategoryUseCase.name,
    Class: UpdateCategoryUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "categoryRepository",
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  //deleteCategoryUseCase
  {
    key: DeleteCategoryUseCase.name,
    Class: DeleteCategoryUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "categoryRepository",
          internal: CategoryRepository.name,
        },
      ],
    },
  },

  //addVendorUseCase
  {
    key: AddVendorUseCase.name,
    Class: AddVendorUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //addVendorUserUseCase
  {
    key: AddVendorUserUseCase.name,
    Class: AddVendorUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
        {
          name: "vendorUserRepository",
          internal: VendorUserRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //getVendorUsersUseCase
  {
    key: GetVendorUsersUseCase.name,
    Class: GetVendorUsersUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
        {
          name: "vendorUserRepository",
          internal: VendorUserRepository.name,
        },
      ],
    },
  },
  //getUserVendorsUseCase
  {
    key: GetUserVendorsUseCase.name,
    Class: GetUserVendorsUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "vendorUserRepository",
          internal: VendorUserRepository.name,
        },
      ],
    },
  },
  //updateVendorUserUseCase
  {
    key: UpdateVendorUserUseCase.name,
    Class: UpdateVendorUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
        {
          name: "vendorUserRepository",
          internal: VendorUserRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //removeVendorUserUseCase
  {
    key: RemoveVendorUserUseCase.name,
    Class: RemoveVendorUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
        {
          name: "vendorUserRepository",
          internal: VendorUserRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  //getAllVendorsUseCase
  {
    key: GetAllVendorsUseCase.name,
    Class: GetAllVendorsUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //verifyVendorUseCase
  {
    key: VerifyVendorUseCase.name,
    Class: VerifyVendorUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //checkVendorNameAvailabilityUseCase
  {
    key: CheckVendorNameAvailabilityUseCase.name,
    Class: CheckVendorNameAvailabilityUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //deleteVendorUseCase
  {
    key: DeleteVendorUseCase.name,
    Class: DeleteVendorUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //getVendorByIdUseCase
  {
    key: GetVendorByIdUseCase.name,
    Class: GetVendorByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //updateVendorUseCase
  {
    key: UpdateVendorUseCase.name,
    Class: UpdateVendorUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
  //rejectVendorUseCase
  {
    key: RejectVendorUseCase.name,
    Class: RejectVendorUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "vendorRepository",
          internal: VendorRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
