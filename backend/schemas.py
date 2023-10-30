from pydantic import BaseModel, conint
from typing import Optional


class OperatorBase(BaseModel):
    login: str


class OperatorCreate(OperatorBase):
    password: str


class OperatorUpdate(OperatorBase):
    id: int
    login: Optional[str] = ""
    password: Optional[str] = ""


class OperatorDelete(BaseModel):
    id: int


class OperatorPrivate(OperatorBase):
    id: int
    login: str = ""
    password: str = ""
    # поле для туров?

    class Config:
        from_attributes = True


class OperatorPublic(OperatorBase):
    id: int

    # поле для туров?

    class Config:
        from_attributes = True


# HotelRoom.
class HotelRoomBase(BaseModel):
    is_free: Optional[bool] = True


class HotelRoomCreate(HotelRoomBase):
    hotel_id: int
    places: int
    price_for_day: float


class HotelRoom(HotelRoomBase):
    id: int

    class Config:
        from_attributes = True


# Hotel.
class HotelBase(BaseModel):
    name: str


class HotelCreate(HotelBase):
    luxury: conint(ge=1, le=5)
    countryCode: str


class HotelUpdate(HotelBase):
    id: int
    name: Optional[str] = ""
    luxury: Optional[conint(ge=1, le=5)] = 0
    countryCode: Optional[str] = ""
    rooms: Optional[list[HotelRoom]] = []


class HotelDelete(BaseModel):
    id: int


class Hotel(HotelBase):
    id: int
    luxury: conint(ge=1, le=5)
    countryCode: str
    rooms: list[HotelRoom] = []

    class Config:
        from_attributes = True


# Tour.
class TourBase(BaseModel):
    pass
