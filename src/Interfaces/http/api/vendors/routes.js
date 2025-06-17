const routes = (handler) => [
  // Vendor routes
  {
    method: "POST",
    path: "/vendors",
    handler: handler.postVendorHandler,
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
    path: "/vendors",
    handler: handler.getVendorsHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner", "manager", "staff"],
        },
      },
    },
  },
  {
    method: "GET",
    path: "/vendors/{id}",
    handler: handler.getVendorByIdHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner", "manager", "staff"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/vendors/{id}",
    handler: handler.putVendorByIdHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner"],
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/vendors/{id}",
    handler: handler.deleteVendorByIdHandler,
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
    path: "/vendors/{id}/verify",
    handler: handler.verifyVendorHandler,
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
    path: "/vendors/{id}/reject",
    handler: handler.rejectVendorHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin"],
        },
      },
    },
  },

  // Vendor User routes
  {
    method: "POST",
    path: "/vendors/{id}/users",
    handler: handler.addVendorUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner"],
        },
      },
    },
  },
  {
    method: "GET",
    path: "/vendors/{id}/users",
    handler: handler.getVendorUsersHandler,
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
    method: "GET",
    path: "/users/{id}/vendors",
    handler: handler.getUserVendorsHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner", "manager", "staff"],
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/vendors/{id}/users/{userId}",
    handler: handler.updateVendorUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner"],
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/vendors/{id}/users/{userId}",
    handler: handler.removeVendorUserHandler,
    options: {
      auth: "BOOKING_JWT",
      plugins: {
        hacli: {
          permissions: ["admin", "owner"],
        },
      },
    },
  },
];

module.exports = routes;
