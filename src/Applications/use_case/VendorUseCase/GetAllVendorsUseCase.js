class GetAllVendorsUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(params = {}) {
    this._validateParams(params);

    const { page = 1, per_page = 10, status, user_id, name } = params;

    const queryParams = {
      page: parseInt(page, 10),
      per_page: parseInt(per_page, 10),
      status,
      user_id,
      name,
    };

    return this._vendorRepository.getVendors(queryParams);
  }

  _validateParams({ page, per_page, status }) {
    if (page && (isNaN(page) || page < 1)) {
      throw new Error("GET_ALL_VENDORS_USE_CASE.INVALID_PAGE_NUMBER");
    }

    if (per_page && (isNaN(per_page) || per_page < 1)) {
      throw new Error("GET_ALL_VENDORS_USE_CASE.INVALID_PER_PAGE_VALUE");
    }

    if (
      status &&
      !["pending", "verified", "rejected ", "deleted"].includes(status)
    ) {
      throw new Error("GET_ALL_VENDORS_USE_CASE.INVALID_STATUS_FILTER");
    }
  }
}

module.exports = GetAllVendorsUseCase;
