from sqlalchemy.orm import Session
import backend.models as models, backend.schemas as schemas


# Admin.
def get_admin_by_id(db: Session, admin_id: int):
    return db.query(models.Admin).filter(models.Admin.id == admin_id).first()


def get_admin_by_login(db: Session, admin_login: str):
    return db.query(models.Admin).filter(models.Admin.login == admin_login).first()


def create_admin(db: Session, admin_create: schemas.Admin):
    if admin_create is not None and get_admin_by_login(db=db, admin_login=admin_create.login) is None:
        db_admin = models.Admin(login=admin_create.login, password=admin_create.password)
        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)
        return db_admin
    return None


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
    operator = get_operator_by_id(db=db, operator_id=operator_update.id)
    if operator is not None:
        if operator_update.login != "" and len(operator_update.login) <= 20:
            operator.login = operator_update.login
        if operator_update.password != "" and len(operator_update.password) <= 20:
            operator.password = operator_update.password
        db.commit()
        db.refresh(operator)
        return operator
    return operator


def update_operator_login(db: Session, operator_update: schemas.OperatorUpdateLogin):
    operator = get_operator_by_id(db=db, operator_id=operator_update.id)
    if operator is not None:
        operator.login = operator_update.login
        db.commit()
        db.refresh(operator)
        return operator
    return operator 


def update_operator_password(db: Session, operator_update: schemas.OperatorUpdatePassword):
    operator = get_operator_by_id(db=db, operator_id=operator_update.id)
    if operator is not None:
        operator.password = operator_update.password
        db.commit()
        db.refresh(operator)
        return operator
    return operator


def delete_operator(db: Session, operator_delete: schemas.OperatorDelete):
    operator = get_operator_by_id(db=db, operator_id=operator_delete.id)
    tours = get_tours_by_operator_id(db=db, operator_id=operator_delete.id)
    if operator is not None and len(tours) == 0:
        db.delete(operator)
        db.commit()
        return True
    return [tour_id.id for tour_id in tours]


def delete_operator_list(db: Session, operator_delete_list: list[schemas.OperatorDelete]):
    tours_table = {}
    for operator_id in operator_delete_list:
        operator = get_operator_by_id(db=db, operator_id=operator_id.id)
        tours = get_tours_by_operator_id(db=db, operator_id=operator_id.id)
        if operator is not None and tours is None:
            db.delete(operator)
        else:
            tours_table[operator_id.id] = [tour_id.id for tour_id in tours]
    db.commit()
    return tours_table


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


def delete_hotel_list(db: Session, hotel_delete_list: list[schemas.OperatorDelete]):
    for hotel_id in hotel_delete_list:
        hotel = get_hotel_by_id(db=db, hotel_id=hotel_id.id)
        if hotel is not None:
            db.delete(hotel)
    db.commit()


# Hotel room
def get_hotel_room_by_id(db: Session, hotel_room_id: int):
    return db.query(models.HotelRoom).filter(models.HotelRoom.id == hotel_room_id).first()


def get_hotel_rooms_by_hotel_id(db: Session, hotel_id: int):
    return db.query(models.HotelRoom).filter(models.HotelRoom.hotelId == hotel_id).all()


def get_all_hotel_rooms(db: Session):
    return db.query(models.HotelRoom).all()


def create_hotel_room(db: Session, hotel_room: schemas.HotelRoomCreate):
    if get_hotel_by_id(db=db, hotel_id=hotel_room.hotelId) is not None:
        db_hotel_room = models.HotelRoom(
            hotelId=hotel_room.hotelId, places=hotel_room.places,
            priceForDay=hotel_room.priceForDay, isFree=hotel_room.isFree
        )
        db.add(db_hotel_room)
        db.commit()
        db.refresh(db_hotel_room)
        print(db_hotel_room)
        return db_hotel_room
    return None


def update_hotel_room(db: Session, hotel_room_update: schemas.HotelRoomUpdate):
    db_hotel_room = get_hotel_room_by_id(db=db, hotel_room_id=hotel_room_update.id)
    if db_hotel_room is not None:
        if hotel_room_update.isFree is not None:
            db_hotel_room.isFree = hotel_room_update.isFree
        if hotel_room_update.places is not None:
            db_hotel_room.places = hotel_room_update.places
        if hotel_room_update.priceForDay is not None:
            db_hotel_room.priceForDay = hotel_room_update.priceForDay
        db.commit()
        db.refresh(db_hotel_room)
        return db_hotel_room
    return None


def delete_hotel_room(db: Session, hotel_room_delete: schemas.HotelRoomDelete):
    db_hotel_room = get_hotel_room_by_id(db=db, hotel_room_id=hotel_room_delete.id)
    if db_hotel_room is not None:
        db.delete(db_hotel_room)
        db.commit()
        return True
    return None


def delete_hotel_room_list(db: Session, hotel_room_delete_list: list[schemas.HotelRoomDelete]):
    for hotel_room_id in hotel_room_delete_list:
        hotel_room = get_hotel_room_by_id(db=db, hotel_room_id=hotel_room_id.id)
        if hotel_room is not None:
            db.delete(hotel_room)
    db.commit()


# Tour.
def get_tour_by_id(db: Session, tour_id: int):
    return db.query(models.Tour).filter(models.Tour.id == tour_id).first()


def get_tours_by_country_code(db: Session, country_code: str):
    return db.query(models.Tour).filter(models.Tour.countryCode == country_code).all()


def get_tours_by_operator_id(db: Session, operator_id: int):
    return db.query(models.Tour).filter(models.Tour.operatorId == operator_id).all()


def get_all_tours(db: Session):
    return db.query(models.Tour).all()


def create_tour(db: Session, tour: schemas.TourCreate):
    if get_operator_by_id(db=db, operator_id=tour.operatorId) is not None and \
            get_hotel_by_id(db=db, hotel_id=tour.hotelId) is not None and \
            (get_hotel_room_by_id(db=db, hotel_room_id=tour.hotelRoomId) is not None and \
            get_hotel_room_by_id(db=db, hotel_room_id=tour.hotelRoomId).hotelId == tour.hotelId and \
            get_hotel_room_by_id(db=db, hotel_room_id=tour.hotelRoomId).isFree):
        db_tour = models.Tour(
            countryCode=tour.countryCode, tourStart=tour.tourStart,
            tourEnd=tour.tourEnd, priceForTour=tour.priceForTour,
            operatorId=tour.operatorId, hotelId=tour.hotelId,
            hotelRoomId=tour.hotelRoomId
        )
        hotel_room_db = get_hotel_room_by_id(db=db, hotel_room_id=tour.hotelRoomId)
        hotel_room_db.isFree = False
        db.add(db_tour)
        db.commit()
        db.refresh(db_tour)
        db.refresh(hotel_room_db)
        return db_tour
    return None


def update_tour(db: Session, tour_update: schemas.TourUpdate):
    db_tour = get_tour_by_id(db=db, tour_id=tour_update.id)
    if db_tour is not None:
        if len(tour_update.countryCode) != 0:
            db_tour.countryCode = tour_update.countryCode
        if tour_update.priceForTour > 0:
            db_tour.priceForTour = tour_update.priceForTour
        if tour_update.tourStart is not None:
            db_tour.tourStart = tour_update.tourStart
        if tour_update.tourEnd is not None:
            db_tour.tourEnd = tour_update.tourEnd
        if get_operator_by_id(db=db, operator_id=tour_update.operatorId) is not None:
            db_tour.operatorId = tour_update.operatorId
        if get_hotel_by_id(db=db, hotel_id=tour_update.hotelId) is not None:
            db_tour.hotelId = tour_update.hotelId
        hotel_room_db = get_hotel_room_by_id(db=db, hotel_room_id=tour_update.hotelRoomId)
        if hotel_room_db is not None and hotel_room_db.hotelId == tour_update.hotelId and hotel_room_db.isFree:
            db_tour.hotelRoomId = hotel_room_db.id
            hotel_room_db.isFree = False
        db.commit()
        db.refresh(db_tour)
        if hotel_room_db is not None:
            db.refresh(hotel_room_db)
        return db_tour
    return None


def delete_tour(db: Session, tour_delete: schemas.TourDelete):
    db_tour = get_tour_by_id(db=db, tour_id=tour_delete.id)
    if db_tour is not None:
        hotel_room_db = get_hotel_room_by_id(db=db, hotel_room_id=db_tour.hotelRoomId)
        hotel_room_db.isFree = True
        db.delete(db_tour)
        db.commit()
        db.refresh(hotel_room_db)
        return True
    return None


def delete_tour_list(db: Session, tour_delete_list: list[schemas.TourDelete]):
    for tour in tour_delete_list:
        delete_tour(db=db, tour_delete=tour)
