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
@app.get("/operators/get_all", response_model=list[schemas.OperatorPrivate])
def get_all_operators(db: Session = Depends(get_db)):
    return crud.get_all_operators(db=db)


@app.post("/operators/create", response_model=schemas.OperatorPrivate)
def create_operator(operator: schemas.OperatorCreate, db: Session = Depends(get_db)):
    return crud.create_operator(db=db, operator=operator)


@app.post("/operators/update", response_model=schemas.OperatorPrivate)
def update_operator(operator: schemas.OperatorUpdate, db: Session = Depends(get_db)):
    operator = crud.update_operator(db=db, operator_update=operator)
    if operator is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return operator


@app.post("/operators/delete")
def delete_operator(operator_delete: schemas.OperatorDelete, db: Session = Depends(get_db)):
    res = crud.delete_operator(db=db, operator_delete=operator_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")


# Hotels API.
@app.get("/hotels/get_all", response_model=list[schemas.Hotel])
def get_all_hotels(db: Session = Depends(get_db)):
    return crud.get_all_hotels(db=db)


@app.post("/hotels/create", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    return crud.create_hotel(db=db, hotel=hotel)


@app.post("/hotels/update", response_model=schemas.Hotel)
def update_operator(hotel: schemas.HotelUpdate, db: Session = Depends(get_db)):
    hotel = crud.update_hotel(db=db, hotel_update=hotel)
    if hotel is None:
        raise HTTPException(status_code=404, detail="It is nothing to update!")
    return hotel


@app.post("/hotels/delete")
def delete_hotel(hotel_delete: schemas.HotelDelete, db: Session = Depends(get_db)):
    res = crud.delete_hotel(db=db, hotel_delete=hotel_delete)
    if res is None:
        raise HTTPException(status_code=404, detail="It is nothing to delete!")
