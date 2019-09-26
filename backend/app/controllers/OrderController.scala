package controllers

import java.sql.Timestamp

import javax.inject.{Inject, Singleton}
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import repositories.OrderRepository

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderController  @Inject()(cc: ControllerComponents,orderRepository: OrderRepository)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def OrdersAll() = {
    Action.async { implicit request =>
      System.out.println("Got request "+request)
      orderRepository.getAllOrders().map {
        order => Ok(Json.toJson(order))
      }
    }
  }


  def OrdersShowId(id: Integer) = Action.async {
    implicit request =>
      System.out.println("Got request "+request)
      val infoOrder = for {
        order <- orderRepository.getSingleOrderById(id)
      } yield (order)

      infoOrder.map { case (computer) =>
        computer match {
          case Some(order) => Ok(Json.toJson(order))
          case None => NotFound
        }
      }
  }

  def OrdersSingleUser(id: String) = Action.async {
    implicit request =>
      System.out.println("Got request "+request)
      orderRepository.getOrdersForUser(id:String).map {
        order => Ok(Json.toJson(order))
      }
  }

  def OrdersDeleteID(id: Integer) = Action.async { implicit request =>
    System.out.println("Got request "+request)
    orderRepository.deleteOrder(id).map(_ => Ok("Deleted"))
  }

  val orderForm: Form[OrderForm] = Form {
    mapping(
      "orderDate" -> sqlTimestamp,
      "productId" -> number,
      "orderQuantity" -> number,
      "shippedDate" -> sqlTimestamp,
      "orderStatus" -> number,
      "userId" -> text,
    )(OrderForm.apply)(OrderForm.unapply)
  }

  def OrdersAddForm = Action.async { implicit request =>
    System.out.println("Got request "+request)
    orderForm.bindFromRequest.fold(
      errors => {
        Future.successful(BadRequest("Error "+errors))
      },
      order => {
        orderRepository.addOrder(
          order.orderDate,
          order.productId,
          order.orderQuantity,
          order.shippedDate,
          order.orderStatus,
          order.userId
        ).map { order =>
          Created(Json.toJson(order))
        }
      }
    )
  }

  def OrdersUpdate(id: Int) =
    Action.async(parse.json) {
      implicit request =>
        orderForm.bindFromRequest.fold(
          _ => {
            Future.successful(BadRequest("Error"))
          },
          order => {
            orderRepository.updateOrder(models.Order(
              id,
              order.orderDate,
              order.productId,
              order.orderQuantity,
              order.shippedDate,
              order.orderStatus,
              order.userId
            )).map({ _ =>
              Ok("Updated")
            })
          }
        )
    }

}

case class OrderForm(orderDate: Timestamp, productId: Int, orderQuantity: Int, shippedDate: Timestamp, orderStatus: Int, userId: String)