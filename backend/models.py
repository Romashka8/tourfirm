from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship

from backend.database import Base


class Admin(Base):
    __tablename__ = "Admin"
    __table_args__ = {"extend_existing": True}
    
    id = Column(Integer, primary_key=True, index=True)
    login = Column(String(20), index=True)
    password = Column(String(20), index=True)

class Operator(Base):
    __tablename__ = "Operator"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    login = Column(String(20), index=True)
    password = Column(String(20), index=True)

    tour = relationship("Tour", back_populates="operator")


class Hotel(Base):
    __tablename__ = "Hotel"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    luxury = Column(Integer)
    countryCode = Column(String(3), index=True)
    name = Column(String(20), index=True)

    hotelRooms = relationship("HotelRoom", back_populates="room")
    tour = relationship("Tour", back_populates="hotel")


class HotelRoom(Base):
    __tablename__ = "HotelRoom"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    places = Column(Integer)
    isFree = Column(Boolean)
    priceForDay = Column(Integer)
    hotelId = Column(Integer, ForeignKey("Hotel.id"))

    room = relationship("Hotel", back_populates="hotelRooms")


class Tour(Base):
    __tablename__ = "Tour"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    countryCode = Column(String(3), index=True)
    tourStart = Column(Date)
    tourEnd = Column(Date)
    priceForTour = Column(Integer)
    operatorId = Column(Integer, ForeignKey("Operator.id"))
    hotelId = Column(Integer, ForeignKey("Hotel.id"))

    operator = relationship("Operator", back_populates="tour")
    hotel = relationship("Hotel", back_populates="tour")
