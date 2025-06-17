const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "ADD_VENDOR_USE_CASE.VENDOR_NAME_ALREADY_EXISTS": new InvariantError(
    "tidak dapat membuat vendor baru karena nama vendor sudah ada"
  ),
  "USER_LOGIN.USER_SUSPENDED": new InvariantError(
    "akun anda telah di-suspend, silahkan hubungi administrator"
  ),
  "USER_LOGIN.USER_BANNED": new InvariantError(
    "akun anda telah di-banned, silahkan hubungi administrator"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "REGISTER_USER.EMAIL_UNAVAILABLE": new InvariantError(
    "tidak dapat membuat user baru karena email tidak tersedia"
  ),
  "NEW_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat pembayaran baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat pembayaran baru karena tipe data tidak sesuai"
  ),
  "NEW_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "NEW_PAYMENT.AMOUNT_MUST_BE_POSITIVE": new InvariantError(
    "jumlah pembayaran harus lebih dari 0"
  ),
  "ADDED_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "pembayaran tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "pembayaran tidak memenuhi spesifikasi tipe data"
  ),
  "ADDED_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "ADDED_PAYMENT.STATUS_NOT_VALID": new InvariantError(
    "status pembayaran tidak valid"
  ),
  "ADDED_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("tipe data paypal transaction id tidak sesuai"),
  "DETAIL_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail pembayaran karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail pembayaran karena tipe data tidak sesuai"
  ),
  "DETAIL_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "DETAIL_PAYMENT.STATUS_NOT_VALID": new InvariantError(
    "status pembayaran tidak valid"
  ),
  "DETAIL_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("tipe data paypal transaction id tidak sesuai"),
  "DETAIL_PAYMENT.ORDER_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "order dalam pembayaran tidak memiliki properti yang dibutuhkan"
  ),
  "DETAIL_PAYMENT.ORDER_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data order dalam pembayaran tidak sesuai"
  ),
  "NEW_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat order baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat order baru karena tipe data tidak sesuai"
  ),
  "NEW_ORDER.QUANTITY_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat order baru karena kuantitas harus lebih dari 0"
  ),
  "NEW_ORDER.TOTAL_AMOUNT_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat order baru karena total amount harus lebih dari 0"
  ),
  "ADDED_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "order tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "order tidak memenuhi spesifikasi tipe data"
  ),
  "ADDED_ORDER.STATUS_NOT_VALID": new InvariantError(
    "status order tidak valid"
  ),
  "DETAIL_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail order karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail order karena tipe data tidak sesuai"
  ),
  "DETAIL_ORDER.STATUS_NOT_VALID": new InvariantError(
    "status order tidak valid"
  ),
  "DETAIL_ORDER.PAYMENT_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data payment tidak sesuai"
  ),
  "DETAIL_ORDER.PRODUCT_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "produk dalam order tidak memiliki properti yang dibutuhkan"
  ),
  "DETAIL_ORDER.PRODUCT_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data produk dalam order tidak sesuai"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat produk baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat produk baru karena tipe data tidak sesuai"
  ),
  "NEW_PRODUCT.PRICE_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat produk baru karena harga harus lebih dari 0"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_NAME": new InvariantError(
    "tidak dapat membuat produk baru karena nama produk tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_DESCRIPTION": new InvariantError(
    "tidak dapat membuat produk baru karena deskripsi produk tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_CATEGORY": new InvariantError(
    "tidak dapat membuat produk baru karena kategori tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_VENDOR": new InvariantError(
    "tidak dapat membuat produk baru karena vendor tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_PRICE": new InvariantError(
    "tidak dapat membuat produk baru karena harga tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_WEIGHT": new InvariantError(
    "tidak dapat membuat produk baru karena berat tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_STOCK": new InvariantError(
    "tidak dapat membuat produk baru karena stok tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_VARIANT_TYPE": new InvariantError(
    "tidak dapat membuat produk baru karena tipe varian tidak ada"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_VARIANTS": new InvariantError(
    "tidak dapat membuat produk baru karena varian tidak ada"
  ),
  "NEW_PRODUCT.WEIGHT_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat produk baru karena berat harus lebih dari 0"
  ),
  "NEW_PRODUCT.INVALID_STOCK_QUANTITY": new InvariantError(
    "tidak dapat membuat produk baru karena jumlah stok tidak valid"
  ),
  "NEW_PRODUCT.DUPLICATE_VARIANT_VALUE": new InvariantError(
    "tidak dapat membuat produk baru karena terdapat nilai varian yang duplikat"
  ),
  "NEW_PRODUCT.VARIANT_PRICE_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat produk baru karena harga varian harus lebih dari 0"
  ),
  "NEW_PRODUCT.VARIANT_WEIGHT_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat produk baru karena berat varian harus lebih dari 0"
  ),
  "NEW_PRODUCT.INVALID_VARIANT_STOCK_QUANTITY": new InvariantError(
    "tidak dapat membuat produk baru karena jumlah stok varian tidak valid"
  ),
  "NEW_PRODUCT.INVALID_STATUS": new InvariantError(
    "tidak dapat membuat produk baru karena status tidak valid"
  ),
  "ADD_PRODUCT.VENDOR_NOT_VERIFIED": new InvariantError(
    "tidak dapat membuat produk baru karena vendor belum diverifikasi"
  ),
  "NEW_VARIANT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat varian produk karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_VARIANT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat varian produk karena tipe data tidak sesuai"
  ),
  "NEW_VARIANT.PRICE_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat varian produk karena harga harus lebih dari 0"
  ),
  "NEW_VARIANT.WEIGHT_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat varian produk karena berat harus lebih dari 0"
  ),
  "NEW_VARIANT.INVALID_STOCK_QUANTITY": new InvariantError(
    "tidak dapat membuat varian produk karena jumlah stok tidak valid"
  ),
  "UPDATE_VARIANT.NO_DATA_TO_UPDATE": new InvariantError(
    "tidak dapat mengubah varian produk karena tidak ada data yang diubah"
  ),
  "UPDATE_VARIANT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengubah varian produk karena tipe data tidak sesuai"
  ),
  "UPDATE_VARIANT.INVALID_PRICE": new InvariantError(
    "tidak dapat mengubah varian produk karena harga tidak valid"
  ),
  "UPDATE_VARIANT.INVALID_WEIGHT": new InvariantError(
    "tidak dapat mengubah varian produk karena berat tidak valid"
  ),
  "UPDATE_VARIANT.INVALID_STOCK_QUANTITY": new InvariantError(
    "tidak dapat mengubah varian produk karena jumlah stok tidak valid"
  ),
  "VARIANT.NOT_FOUND": new InvariantError("varian produk tidak ditemukan"),
  "VARIANT.PRODUCT_NOT_FOUND": new InvariantError("produk tidak ditemukan"),
  "VARIANT.NO_VARIANTS_SUPPORT": new InvariantError(
    "produk tidak mendukung varian"
  ),
  "VARIANT.VALUE_EXISTS": new InvariantError("nilai varian sudah ada"),
  "VARIANT.CANNOT_DELETE_LAST": new InvariantError(
    "tidak dapat menghapus varian terakhir"
  ),
  "VARIANT.HAS_PENDING_ORDERS": new InvariantError(
    "tidak dapat menghapus varian yang memiliki pesanan tertunda"
  ),
  "PRODUCT.DELETE_ACTIVE_PRODUCT": new InvariantError(
    "tidak dapat menghapus produk yang masih aktif"
  ),
  "PRODUCT.HAS_PENDING_ORDERS": new InvariantError(
    "tidak dapat menghapus produk yang memiliki pesanan tertunda"
  ),
  "PAGINATION.INVALID_PAGE": new InvariantError("nomor halaman tidak valid"),
  "PAGINATION.INVALID_PER_PAGE": new InvariantError(
    "jumlah item per halaman tidak valid"
  ),
  "FILTER.INVALID_STATUS": new InvariantError("filter status tidak valid"),
  "FILTER.INVALID_HAS_VARIANT": new InvariantError(
    "filter variant tidak valid"
  ),
  "ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "produk tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "produk tidak memenuhi spesifikasi tipe data"
  ),
  "DETAIL_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail produk karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail produk karena tipe data tidak sesuai"
  ),
  "DETAIL_PRODUCT.OWNER_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail produk karena tipe data owner tidak sesuai"
  ),
  "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_COMMENT.NOT_MEET_DATA_SPESIFICATION": new InvariantError(
    "tidak dapat membuat comment baru karena tipe data tidak sesuai"
  ),
  "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_USER.NAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter name melebihi batas limit"
  ),
  "REGISTER_USER.EMAIL_NOT_VALID": new InvariantError(
    "tidak dapat membuat user baru karena format email tidak valid"
  ),
  "REGISTER_USER.ROLE_NOT_VALID": new InvariantError(
    "tidak dapat membuat user baru karena role tidak valid"
  ),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan email dan password"
  ),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "email dan password harus string"
  ),
  "USER_LOGIN.EMAIL_NOT_VALID": new InvariantError("format email tidak valid"),
  "USER_LOGIN.USER_SUSPENDED": new InvariantError(
    "akun anda telah di-suspend, silahkan hubungi administrator"
  ),
  "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user karena properti yang dibutuhkan tidak lengkap"
  ),
  "REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user karena tipe data tidak sesuai"
  ),
  "REGISTERED_USER.ROLE_NOT_VALID": new InvariantError(
    "tidak dapat membuat user karena role tidak valid"
  ),
  "REGISTERED_USER.STATUS_NOT_VALID": new InvariantError(
    "tidak dapat membuat user karena status tidak valid"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena property tidak lengkap Silahkan cek kembali"
  ),
};

module.exports = DomainErrorTranslator;
