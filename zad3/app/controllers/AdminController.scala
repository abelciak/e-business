package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class AdminController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def ProductsAll = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsAddForm = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsAddAction = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsEditAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def ProductsDeleteAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersAll = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersShowID(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def OrdersStatusID(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesAll = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesAddForm = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesAddAction = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesEditAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def CategoriesDeleteAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def UsersAll = Action {
    Ok(views.html.index("Test"))
  }

  def UsersEditAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

  def UsersDeleteAction(id: Integer) = Action {
    Ok(views.html.index("Test"))
  }

}
