package repositories

import javax.inject.{ Inject, Singleton }
import models.UserDB
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class UserDBRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private val usersDB = TableQuery[UserDBTable]

  def getAllUsers(): Future[Seq[UserDB]] = db.run {
    usersDB.result
  }

  def addUser(userDB: UserDB): Future[Int] = db.run {
    usersDB.insertOrUpdate(userDB)
  }

  def deleteUser(userID: String): Future[Unit] = db.run {
    usersDB.filter(_.userID === userID).delete.map(_ => ())
  }

  class UserDBTable(tag: Tag) extends Table[UserDB](tag, "users") {
    def * = (userID, fullname, providerID, email) <> ((UserDB.apply _).tupled, UserDB.unapply)
    def userID = column[String]("userID", O.PrimaryKey)
    def fullname = column[String]("fullname")
    def providerID = column[String]("providerID")
    def email = column[String]("email")
  }

}
