class VerifyVendorUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(option, vendorId, verificationData) {
    if (option !== "verify") {
      this._validateVerificationData(verificationData);

      const vendor = await this._vendorRepository.getVendorById(vendorId);

      if (!vendor) {
        throw new Error("VERIFY_VENDOR_USE_CASE.VENDOR_NOT_FOUND");
      }

      if (vendor.status === "verified") {
        throw new Error("VERIFY_VENDOR_USE_CASE.VENDOR_ALREADY_VERIFIED");
      }

      if (vendor.status === "rejected") {
        throw new Error("VERIFY_VENDOR_USE_CASE.CANNOT_VERIFY_REJECTED_VENDOR");
      }

      const verificationPayload = {
        status: "verified",
        verification_notes: verificationData.verification_notes,
        verified_by: verificationData.verified_by,
        verification_at: new Date().toISOString(),
      };

      return this._vendorRepository.verifyVendor(vendorId, verificationPayload);
    }

    const vendor = await this._vendorRepository.getVendorById(vendorId);

    if (!vendor) {
      throw new Error("VERIFY_VENDOR_USE_CASE.VENDOR_NOT_FOUND");
    }

    if (vendor.status === "rejected") {
      throw new Error("VERIFY_VENDOR_USE_CASE.VENDOR_ALREADY_REJECTED");
    }

    const rejectionPayload = {
      status: "rejected",
      verification_notes: verificationData.verification_notes,
      verified_by: verificationData.verified_by,
      verification_at: new Date().toISOString(),
    };

    return this._vendorRepository.verifyVendor(vendorId, rejectionPayload);
  }

  _validateVerificationData({ verified_by, verification_notes }) {
    if (!verified_by) {
      throw new Error("VERIFY_VENDOR_USE_CASE.VERIFIER_ID_NOT_PROVIDED");
    }

    if (!verification_notes) {
      throw new Error("VERIFY_VENDOR_USE_CASE.VERIFICATION_NOTES_NOT_PROVIDED");
    }
  }
}

module.exports = VerifyVendorUseCase;
