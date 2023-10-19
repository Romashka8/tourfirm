import uvicorn

from backend.database import engine
import backend.models as models


models.Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("backend.api:app", host="127.0.0.0", port=8000, reload=True)
