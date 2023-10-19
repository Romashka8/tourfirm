from pydantic import BaseModel


class OperatorBase(BaseModel):
    login: str
    password: str


class OperatorCreate(OperatorBase):
    pass


class Operator(OperatorBase):
    id: int

    class Config:
        from_attributes = True
