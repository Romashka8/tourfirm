from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def navigation_route():
    return {"message": "Welcome on our API!"}


# Operator API.
@app.get("/operators/get_all", response_model=list[schemas.OperatorPrivate], tags=["operators"])
def get_all_operators(db: Session = Depends(get_db)):
    return crud.get_all_operators(db=db)


@app.post("/operators/create", response_model=schemas.OperatorPrivate, tags=["operators"])
def create_operator(operator: schemas.OperatorCreate, db: Session = Depends(get_db)):
    return crud.create_operator(db=db, operator=operator)


@app.post("/operators/update", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator(operator: schemas.OperatorUpdate, db: Session = Depends(get_db)):
    operator = crud.update_operator(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/update_login", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator_login(operator: schemas.OperatorUpdateLogin, db: Session = Depends(get_db)):
    operator = crud.update_operator_login(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/update_password", response_model=schemas.OperatorPrivate, tags=["operators"])
def update_operator_password(operator: schemas.OperatorUpdatePassword, db: Session = Depends(get_db)):
    operator = crud.update_operator_password(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/delete", tags=["operators"])
def delete_operator(operator_delete: schemas.OperatorDelete, db: Session = Depends(get_db)):
    res = crud.delete_operator(db=db, operator_delete=operator_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")
    return res


@app.post("/operators/delete_list", tags=["operators"])
def delete_operator_list(operator_delete_list: list[schemas.OperatorDelete], db: Session = Depends(get_db)):
    return crud.delete_operator_list(db=db, operator_delete_list=operator_delete_list)


# Hotels API.
@app.get("/hotels/get_all", response_model=list[schemas.Hotel], tags=["hotels"])
def get_all_hotels(db: Session = Depends(get_db)):
    return crud.get_all_hotels(db=db)


@app.post("/hotels/create", response_model=schemas.Hotel, tags=["hotels"])
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    return crud.create_hotel(db=db, hotel=hotel)


@app.post("/hotels/update", response_model=schemas.Hotel, tags=["hotels"])
def update_hotel(hotel: schemas.HotelUpdate, db: Session = Depends(get_db)):
    hotel = crud.update_hotel(db=db, hotel_update=hotel)
    if hotel is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return hotel


@app.post("/hotels/delete", tags=["hotels"])
def delete_hotel(hotel_delete: schemas.HotelDelete, db: Session = Depends(get_db)):
    res = crud.delete_hotel(db=db, hotel_delete=hotel_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/hotels/delete_list", tags=["hotels"])
def delete_hotel_list(hotel_delete_list: list[schemas.HotelDelete], db: Session = Depends(get_db)):
    crud.delete_hotel_list(db=db, hotel_delete_list=hotel_delete_list)


# Hotel room.
@app.get("/hotel_rooms/get_all", response_model=list[schemas.HotelRoom], tags=["rooms"])
def get_all_hotel_rooms(db: Session = Depends(get_db)):
    return crud.get_all_hotel_rooms(db=db)


@app.post("/hotel_rooms/create", response_model=schemas.HotelRoom, tags=["rooms"])
def create_hotel_room(hotel_room: schemas.HotelRoomCreate, db: Session = Depends(get_db)):
    print(hotel_room)
    return crud.create_hotel_room(db=db, hotel_room=hotel_room)


@app.post("/hotel_rooms/update", response_model=schemas.HotelRoom, tags=["rooms"])
def update_hotel_room(hotel_room: schemas.HotelRoomUpdate, db: Session = Depends(get_db)):
    hotel_room = crud.update_hotel_room(db=db, hotel_room_update=hotel_room)
    if hotel_room is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return hotel_room


@app.post("/hotel_rooms/delete", tags=["rooms"])
def delete_hotel_room(hotel_room_delete: schemas.HotelRoomDelete, db: Session = Depends(get_db)):
    res = crud.delete_hotel_room(db=db, hotel_room_delete=hotel_room_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/hotel_rooms/delete_list", tags=["rooms"])
def delete_hotel_room_list(hotel_room_delete_list: list[schemas.HotelRoomDelete], db: Session = Depends(get_db)):
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
def delete_tour(tour_delete: schemas.TourDelete, db: Session = Depends(get_db)):
    res = crud.delete_tour(db=db, tour_delete=tour_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


@app.post("/tours/delete_list", tags=["tours"])
def delete_tour_list(tour_delete_list: list[schemas.TourDelete], db: Session = Depends(get_db)):
    return crud.delete_tour_list(db=db, tour_delete_list=tour_delete_list)
