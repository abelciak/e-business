package controllers

import javax.inject._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc._
import repositories.ProductRepository

import scala.concurrent._

@Singleton
class ProductController @Inject() (cc: ControllerComponents, productRepository: ProductRepository)(implicit ec: ExecutionContext) extends AbstractController(cc) {
  def ProductsAll = Action.async {
    implicit request =>
      System.out.println("Got request " + request)
      productRepository.getAllProducts().map {
        product => Ok(Json.toJson(product))
      }

  }

  def ProductsShowID(id: Integer) = Action.async {
    implicit request =>
      System.out.println("Got request " + request)
      val infoProduct = for {
        product <- productRepository.getSingleProductById(id)
      } yield (product)

      infoProduct.map {
        case (computer) =>
          computer match {
            case Some(product) => Ok(Json.toJson(product))
            case None => NotFound
          }
      }
  }

  def ProductsDeleteID(id: Integer) = Action.async { implicit request =>
    System.out.println("Got request " + request)
    productRepository.deleteProduct(id).map(_ => Ok("Deleted"))
  }

  def ProductsUpdateID(id: Integer) = Action.async(parse.json) {
    implicit request =>
      System.out.println("Got request " + request)
      productForm.bindFromRequest.fold(
        errors => {
          Future.successful(BadRequest("Error " + errors))
        },
        product => {
          productRepository.updateProduct(models.Product(
            id,
            product.productName,
            product.productDescription,
            product.productPrice
          )).map({ _ =>
            Ok("Updated")
          })
        }
      )
  }

  val productForm: Form[ProductForm] = Form {
    mapping(
      "productName" -> nonEmptyText,
      "productDescription" -> nonEmptyText,
      "productPrice" -> of(bigDecimalFormat)
    )(ProductForm.apply)(ProductForm.unapply)
  }

  def ProductsAddForm() = Action.async { implicit request =>
    System.out.println("Got request " + request)
    productForm.bindFromRequest.fold(
      errors => {
        Future.successful(BadRequest("Error " + errors))
      },
      product => {
        productRepository.addProduct(
          product.productName,
          product.productDescription,
          product.productPrice
        ).map { product =>
            Created(Json.toJson(product))
          }
      }
    )

  }

}

case class ProductForm(productName: String, productDescription: String, productPrice: BigDecimal)
