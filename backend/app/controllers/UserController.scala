package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import play.api.data.Form
import play.api.data.Forms.{ mapping, _ }
import play.api.libs.json.Json
import play.api.mvc._
import repositories.UserDBRepository
import utils.auth.DefaultEnv

import scala.concurrent._

class UserController @Inject() (cc: MessagesControllerComponents, userDBRepository: UserDBRepository, silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def UserShowInfo() = silhouette.SecuredAction { implicit request =>
    // val json = Json.toJson(request.identity).
    System.out.println("Got request " + request)
    val userInfo = Json.obj(
      "fullname" -> request.identity.fullName,
      "userID" -> request.identity.userID,
      "loginInfo" -> request.identity.loginInfo,
      "activated" -> request.identity.activated,
      "email" -> request.identity.email,
      "firstName" -> request.identity.firstName,
      "lastName" -> request.identity.lastName
    )
    Ok(Json.toJson(userInfo))
  }

  def UsersAll = Action.async {
    implicit request =>
      System.out.println("Got request " + request)
      userDBRepository.getAllUsers().map {
        userdb => Ok(Json.toJson(userdb))
      }

  }

  def UsersDeleteID(id: String) = Action.async { implicit request =>
    System.out.println("Got request " + request)
    userDBRepository.deleteUser(id).map(_ => Ok("Deleted"))
  }

  val userDBForm: Form[UserDBForm] = Form {
    mapping(
      "userID" -> nonEmptyText,
      "fullName" -> nonEmptyText,
      "providerID" -> nonEmptyText,
      "email" -> nonEmptyText

    )(UserDBForm.apply)(UserDBForm.unapply)
  }

  def UsersAddForm() = Action.async(parse.json) {
    implicit request =>
      System.out.println("Got request " + request)
      userDBForm.bindFromRequest.fold(
        errors => {
          Future.successful(BadRequest("Error " + errors))
        },
        userDB => {
          //System.out.println("Fullname = " + userDB.fullname);
          userDBRepository.addUser(models.UserDB(
            userDB.userID,
            userDB.fullname,
            userDB.providerID,
            userDB.email
          )).map({ _ =>
            Ok("Added")
          })
        }
      )
  }

}

case class UserDBForm(userID: String, fullname: String, providerID: String, email: String)