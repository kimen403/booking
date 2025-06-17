const VendorsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "vendors",
  register: async (server, { container }) => {
    const vendorsHandler = new VendorsHandler(container);
    server.route(routes(vendorsHandler));
  },
};
