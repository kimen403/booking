const routes = (handler) => [
  {
    method: "POST",
    path: "/login",
    handler: handler.postAuthenticationHandler,
  },
  {
    method: "PUT",
    path: "/authentications",
    handler: handler.putAuthenticationHandler,
  },
  {
    method: "DELETE",
    path: "/logout",
    handler: handler.deleteAuthenticationHandler,
    options: {
      auth: "BOOKING_JWT",
    },
  },
];

module.exports = routes;
