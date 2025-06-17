const routes = (handler) => [
  {
    method: "POST",
    path: "/categories",
    handler: handler.postCategoryHandler,
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
    path: "/categories",
    handler: handler.getCategoriesHandler,
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
    path: "/categories/{id}",
    handler: handler.getCategoryByIdHandler,
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
    path: "/categories/{id}",
    handler: handler.putCategoryByIdHandler,
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
    path: "/categories/{id}",
    handler: handler.deleteCategoryByIdHandler,
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
