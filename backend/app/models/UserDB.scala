package models

import play.api.libs.json.Json

case class UserDB(userID: String, fullname: String, providerID: String, email: String)

object UserDB {
  implicit val UserDBFormat = Json.format[UserDB]
}