package models

import java.sql.Timestamp
import java.text.SimpleDateFormat
import play.api.libs.json._

case class Order(orderId: Int, orderDate: Timestamp, productId: Int, orderQuantity: Int, shippedDate: Timestamp, orderStatus: Int, userId: String)

object Order extends ((Int, Timestamp, Int, Int, Timestamp, Int, String) => Order) {
  implicit object timestampFormat extends Format[Timestamp] {
    val format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS'Z'")
    def reads(json: JsValue) = {
      val str = json.as[String]
      JsSuccess(new Timestamp(format.parse(str).getTime))
    }
    def writes(ts: Timestamp) = JsString(format.format(ts))
  }

  implicit val OrderFormat = Json.format[Order]
}