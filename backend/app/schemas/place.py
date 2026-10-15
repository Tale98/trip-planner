from typing_extensions import Annotated
from typing_extensions import List
from pydantic import BaseModel

class AutoCompleteRequest(BaseModel):
    text: str
    session_token: str
class AutoCompleteSearchResult(BaseModel):
    place_id: str
    text: str
class AutoCompleteResponse(BaseModel):
    suggests: List[AutoCompleteSearchResult]
class GetPlaceDetailRequest(BaseModel):
    session_token: str
    place_id: str

class DisplayName(BaseModel):
    text: str
    language_code: str
class LatLng(BaseModel):
    latitude: float
    longitude: float
class Bounds(BaseModel):
    north: float
    east: float
    south: float
    west: float
class PlaceDetailData(BaseModel):
    id: str
    display_name: DisplayName
    location: LatLng
    bounds: Annotated[Bounds | None, None]
class GetPlaceDetailResponse(BaseModel):
    message: str
    details: PlaceDetailData