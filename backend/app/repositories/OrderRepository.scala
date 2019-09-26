package repositories

import java.sql.Timestamp

import javax.inject.{ Inject, Singleton }
import models.Order
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import profile.api._

  private val orders = TableQuery[OrderTable]

  def getAllOrders(): Future[Seq[Order]] = db.run {
    orders.result
  }

  def getSingleOrderById(orderId: Int): Future[Option[Order]] = db.run {
    orders.filter(_.orderId === orderId).result.headOption
  }

  def getOrdersForUser(userId: String): Future[Seq[Order]] = db.run {
    orders.filter(_.userId === userId).result
  }

  def deleteOrder(orderId: Int): Future[Unit] = db.run {
    orders.filter(_.orderId === orderId).delete.map(_ => ())
  }

  def addOrder(orderDate: Timestamp, productId: Int, orderQuantity: Int, shippedDate: Timestamp, orderStatus: Int, userId: String): Future[Order] = db.run {
    (orders.map(p => (p.orderDate, p.productId, p.orderQuantity, p.shippedDate, p.orderStatus, p.userId))
      returning orders.map(_.orderId)
      into { case ((orderDate, productId, orderQuantity, shippedDate, orderStatus, userId), orderId) => Order(orderId, orderDate, productId, orderQuantity, shippedDate, orderStatus, userId) }
    ) += ((orderDate, productId, orderQuantity, shippedDate, orderStatus, userId))
  }

  def updateOrder(order: Order) = db.run {
    orders.insertOrUpdate(order)
  }

  class OrderTable(tag: Tag) extends Table[Order](tag, "orders") {
    def orderId = column[Int]("orderId", O.PrimaryKey, O.AutoInc)
    def orderDate = column[Timestamp]("orderDate")
    def productId = column[Int]("productId")
    def orderQuantity = column[Int]("orderQuantity")
    def shippedDate = column[Timestamp]("shippedDate")
    def orderStatus = column[Int]("orderStatus")
    def userId = column[String]("userId")

    def * = (orderId, orderDate, productId, orderQuantity, shippedDate, orderStatus, userId) <> ((Order.apply _).tupled, Order.unapply)
  }

}