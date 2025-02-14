export class UserVerifyStatus {
  static _Unverified = 0 // chưa xác thực email, mặc định = 0
  static _Verified = 1 // đã xác thực email
  static _Banned = 2 // bị khóa

  static get Unverified() {
    return this._Unverified
  }
  static get Verified() {
    return this._Verified
  }
  static get Banned() {
    return this._Banned
  }
}
export class USER_ROLE {
  static _Admin = 0 //0
  static _Staff = 1 //1
  static _User = 2 //2

  static get Admin() {
    return this._Admin
  }
  static get Staff() {
    return this._Staff
  }
  static get User() {
    return this._User
  }
}
