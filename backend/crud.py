from sqlalchemy.orm import Session
import backend.models as models, backend.schemas as schemas


# Operator.
def get_all_operators(db: Session):
    return db.query(models.Operator).all()


def get_operator_by_id(db: Session, operator_id: int):
    return db.query(models.Operator).filter(models.Operator.id == operator_id).first()


def get_operator_by_login(db: Session, operator_login: str):
    return db.query(models.Operator).filter(models.Operator.login == operator_login).first()


def create_operator(db: Session, operator: schemas.OperatorCreate):
    db_operator = models.Operator(login=operator.login, password=operator.password)
    db.add(db_operator)
    db.commit()
    db.refresh(db_operator)
    return db_operator


def update_operator(db: Session, operator_update: schemas.OperatorUpdate):
    operator = get_operator_by_id(db, operator_update.id)
    if operator is not None:
        if operator_update.login != "" and len(operator_update.login) <= 20:
            operator.login = operator_update.login
        if operator_update.password != "" and len(operator_update.password) <= 20:
            operator.password = operator_update.password
        db.commit()
        db.refresh(operator)
        return operator
    return None


def delete_operator(db: Session, operator_delete: schemas.OperatorDelete):
    operator = get_operator_by_id(db, operator_delete.id)
    if operator is not None:
        db.delete(operator)
        db.commit()
        return True
    return None


# Hotel.
def get_hotel_by_id(db: Session, hotel_id: int):
    return db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()


def get_hotel_by_name(db: Session, hotel_name: str):
    return db.query(models.Hotel).filter(models.Hotel.name == hotel_name).first()


def get_hotels_by_country_code(db: Session, country_code: str):
    return db.query(models.Hotel).filter(models.Hotel.countryCode == country_code).all()


def get_all_hotels(db: Session):
    return db.query(models.Hotel).all()


def create_hotel(db: Session, hotel: schemas.HotelCreate):
    db_hotel = models.Hotel(
        name=hotel.name, luxury=hotel.luxury,
        countryCode=hotel.countryCode
        )
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel


def update_hotel(db: Session, hotel_update: schemas.HotelUpdate):
    db_hotel = get_hotel_by_id(db=db, hotel_id=hotel_update.id)
    if db_hotel is not None:
        if len(hotel_update.name) != 0:
            db_hotel.name = hotel_update.name
        if hotel_update.luxury != 0:
            db_hotel.luxury = hotel_update.luxury
        if len(hotel_update.countryCode) != 0:
            db_hotel.countryCode = hotel_update.countryCode
        if len(hotel_update.rooms) != 0:
            db_hotel.rooms = hotel_update.rooms
        db.commit()
        db.refresh(db_hotel)
        return db_hotel
    return None


def delete_hotel(db: Session, hotel_delete: schemas.HotelDelete):
    db_hotel = get_hotel_by_id(db, hotel_delete.id)
    if db_hotel is not None:
        db.delete(db_hotel)
        db.commit()
        return True
    return None
