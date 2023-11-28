import uvicorn

from backend.database import engine, SessionLocal
import backend.models as models
import backend.crud as crud
import backend.schemas as schemas


models.Base.metadata.create_all(bind=engine)

def create_admin_in_db():
    ADMINS = [
        {
          "login": "Admin1",
          "password": "Password1" 
        },
        {
          "login": "Admin2",
          "password": "Password2" 
        }
    ]

    for admin in ADMINS:
        admin = schemas.AdminCreate(login=admin["login"], password=admin["password"])
        crud.create_admin(db=SessionLocal(), admin_create=admin)
    return


create_admin_in_db()


if __name__ == "__main__":
    uvicorn.run("backend.api:app", host="127.0.0.0", port=8000, reload=True)
