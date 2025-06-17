const routes = (handler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
  {
    method: "GET",
    path: "/users",
    handler: handler.getUsersHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    handler: handler.getUserByIdHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner", "manager"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: handler.putUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: handler.deleteUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}/suspend",
    handler: handler.suspendUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}/ban",
    handler: handler.banUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}/activate",
    handler: handler.activateUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
  {
    method: "GET",
    path: "/users/availability",
    handler: handler.checkUserAvailabilityHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },
];

module.exports = routes;
