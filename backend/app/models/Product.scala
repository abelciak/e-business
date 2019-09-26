package models

import play.api.libs.json.Json

case class Product(productId: Int, productName: String, productDescription: String, productPrice: BigDecimal)

object Product {
  implicit val ProductFormat = Json.format[Product]
}