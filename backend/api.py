from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Annotated
from datetime import datetime, timedelta

import backend.crud as crud
import backend.schemas as schemas
from backend.database import SessionLocal

app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# функции для установления зависимостей.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "0b2ab43e07f7d350574ed3779b48409a442ab98d14f51511dc7a4b61c359b033"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    hashed_password = get_password_hash(hashed_password)
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(login: str, password: str, db: Session = Depends(get_db)):
    user = crud.get_operator_by_login(db=db, operator_login=login)
    role = "operator" if user is not None else None
    if user is None:
        user = crud.get_admin_by_login(db=db, admin_login=login)
        role = "admin"
    if user is None:
        return (False, False)
    if not verify_password(password, user.password):
        return (False, False)
    id = user.id
    return (user, role, id)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: schemas.Token, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    token = token.access_token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_operator_by_login(db=db, operator_login=token_data.username)
    if user is None:
        user = crud.get_admin_by_login(db=db, admin_login=token_data.username)
    if user is None:
        raise credentials_exception
    return user


# приветственный адрес.
@app.get("/")
def navigation_route():
    return {"message": "Welcome on our API!"}


# Авторизация пользователя.
@app.post("/autorization/token", response_model=schemas.Token, tags=["autorization"])
def login_for_access_token(form_data: schemas.LoginFormData, db: Session = Depends(get_db)):
    user, role, id = authenticate_user(login=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.login}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "role": role, "id": id}


# Operator API.
@app.get("/operators/get_all", response_model=list[schemas.OperatorPrivate], tags=["operators"])
def get_all_operators(db: Session = Depends(get_db)):
    return crud.get_all_operators(db=db)


@app.post("/operators/create", response_model=schemas.OperatorPrivate, tags=["operators"])
def create_operator(operator: schemas.OperatorCreate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    return crud.create_operator(db=db, operator=operator)


@app.post("/operators/update", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator(operator: schemas.OperatorUpdate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    operator = crud.update_operator(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/update_login", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator_login(operator: schemas.OperatorUpdateLogin, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    operator = crud.update_operator_login(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/update_password", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator_password(operator: schemas.OperatorUpdatePassword, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    operator = crud.update_operator_password(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/delete", tags=["operators"])
def delete_operator(operator_delete: schemas.OperatorDelete, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    res = crud.delete_operator(db=db, operator_delete=operator_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")
    return res


@app.post("/operators/delete_list", tags=["operators"])
def delete_operator_list(operator_delete_list: list[schemas.OperatorDelete], current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    return crud.delete_operator_list(db=db, operator_delete_list=operator_delete_list)


# Hotels API.
@app.get("/hotels/get_all", response_model=list[schemas.Hotel], tags=["hotels"])
def get_all_hotels(db: Session = Depends(get_db)):
    return crud.get_all_hotels(db=db)


@app.post("/hotels/create", response_model=schemas.Hotel, tags=["hotels"])
def create_hotel(hotel: schemas.HotelCreate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    return crud.create_hotel(db=db, hotel=hotel)


@app.post("/hotels/update", response_model=schemas.Hotel, tags=["hotels"])
def update_hotel(hotel: schemas.HotelUpdate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    hotel = crud.update_hotel(db=db, hotel_update=hotel)
    if hotel is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return hotel


@app.post("/hotels/delete", tags=["hotels"])
def delete_hotel(hotel_delete: schemas.HotelDelete, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    res = crud.delete_hotel(db=db, hotel_delete=hotel_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/hotels/delete_list", tags=["hotels"])
def delete_hotel_list(hotel_delete_list: list[schemas.HotelDelete], current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    crud.delete_hotel_list(db=db, hotel_delete_list=hotel_delete_list)


# Hotel room.
@app.get("/hotel_rooms/get_all", response_model=list[schemas.HotelRoom], tags=["rooms"])
def get_all_hotel_rooms(db: Session = Depends(get_db)):
    return crud.get_all_hotel_rooms(db=db)


@app.post("/hotel_rooms/create", response_model=schemas.HotelRoom, tags=["rooms"])
def create_hotel_room(hotel_room: schemas.HotelRoomCreate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    return crud.create_hotel_room(db=db, hotel_room=hotel_room)


@app.post("/hotel_rooms/update", response_model=schemas.HotelRoom, tags=["rooms"])
def update_hotel_room(hotel_room: schemas.HotelRoomUpdate, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    hotel_room = crud.update_hotel_room(db=db, hotel_room_update=hotel_room)
    if hotel_room is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return hotel_room


@app.post("/hotel_rooms/delete", tags=["rooms"])
def delete_hotel_room(hotel_room_delete: schemas.HotelRoomDelete, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    res = crud.delete_hotel_room(db=db, hotel_room_delete=hotel_room_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/hotel_rooms/delete_list", tags=["rooms"])
def delete_hotel_room_list(hotel_room_delete_list: list[schemas.HotelRoomDelete], current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    return crud.delete_hotel_room_list(db=db, hotel_room_delete_list=hotel_room_delete_list)


# Tours.
@app.get("/tours/get_all", response_model=list[schemas.Tour], tags=["tours"])
def get_all_tours(db: Session = Depends(get_db)):
    return crud.get_all_tours(db=db)


@app.post("/tours/create", response_model=schemas.Tour, tags=["tours"])
def create_tour(tour: schemas.TourCreate, db: Session = Depends(get_db)):
    tour = crud.create_tour(db=db, tour=tour)
    if tour is None:
        raise HTTPException(status_code=400, detail="Something wrong with your data! Check hotels and rooms!")
    return tour


@app.post("/tours/update", response_model=schemas.Tour, tags=["tours"])
def update_tour(tour: schemas.TourUpdate, db: Session = Depends(get_db)):
    hotel = crud.update_tour(db=db, tour_update=tour)
    if tour is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return tour


@app.post("/tours/delete", tags=["tours"])
def delete_tour(tour_delete: schemas.TourDelete, current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    res = crud.delete_tour(db=db, tour_delete=tour_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/tours/delete_list", tags=["tours"])
def delete_tour_list(tour_delete_list: list[schemas.TourDelete], current_user: Annotated[schemas.Token, Depends(get_current_user)],
        db: Session = Depends(get_db)):
    if not("Admin" in str(current_user)):
        raise HTTPException(status_code=405)
    return crud.delete_tour_list(db=db, tour_delete_list=tour_delete_list)
