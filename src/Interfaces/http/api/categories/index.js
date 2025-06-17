const routes = require("./routes");
const CategoriesHandler = require("./handler");

module.exports = {
  name: "Categories",
  version: "1.0.0",
  register: async (server, { container }) => {
    const categoriesHandler = new CategoriesHandler(container);
    server.route(routes(categoriesHandler));
  },
};
