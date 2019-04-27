package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class UserController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

   def loginForm = Action {
    Ok(views.html.index("Test"))
  }

  def loginAction = Action {
    Ok(views.html.index("Test"))
  }
  def logoutAction = Action {
    Ok(views.html.index("Test"))
  }
  def registerForm = Action {
    Ok(views.html.index("Test"))
  }

  def registerAction = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsAll = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsShowID(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsBuyIDAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesAll = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesShowID(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersSendAction = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersAll = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersShowID(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def ShowHomeSite = Action {
    Ok(views.html.index("Test"))
  }

  def ShowRules = Action {
    Ok(views.html.index("Test"))
  }

  def ShowContactSite = Action {
    Ok(views.html.index("Test"))
  }

}
