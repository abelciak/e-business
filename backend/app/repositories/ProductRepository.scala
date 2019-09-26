package repositories

import javax.inject.{ Inject, Singleton }
import models.Product
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class ProductRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private val products = TableQuery[ProductTable]

  def getAllProducts(): Future[Seq[Product]] = db.run {
    products.result
  }

  def deleteProduct(productId: Int): Future[Unit] = db.run {
    products.filter(_.productId === productId).delete.map(_ => ())
  }

  def updateProduct(product: Product): Future[Int] = db.run {
    products.insertOrUpdate(product)
  }

  def getSingleProductById(productId: Int): Future[Option[Product]] = db.run {
    products.filter(_.productId === productId).result.headOption
  }

  def addProduct(
    productName: String,
    productDescription: String,
    productPrice: BigDecimal
  ): Future[Product] = db.run {
    (products.map(product => (
      product.productName,
      product.productDescription,
      product.productPrice
    ))
      returning products.map(_.productId)
      into {
        case ((
          productName: String,
          productDescription: String,
          productPrice: BigDecimal
          ), productId) => Product(productId, productName, productDescription, productPrice)
      }) += ((productName, productDescription, productPrice))
  }

  class ProductTable(tag: Tag) extends Table[Product](tag, "products") {
    def * = (productId, productName, productDescription, productPrice) <> ((Product.apply _).tupled, Product.unapply)
    def productId = column[Int]("productId", O.PrimaryKey, O.AutoInc)
    def productName = column[String]("productName")
    def productDescription = column[String]("productDescription")
    def productPrice = column[BigDecimal]("productPrice")
  }

}
