from sqlalchemy.orm import Session
import backend.models as models, backend.schemas as schemas


def create_operator(db: Session, operator: schemas.OperatorCreate):
    db_operator = models.Operator(login=operator.login, password=operator.password)
    db.add(db_operator)
    db.commit()
    db.refresh(db_operator)
    return db_operator

