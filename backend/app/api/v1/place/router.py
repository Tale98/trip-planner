from http import HTTPStatus
from google.api_core.exceptions import GoogleAPICallError
from google.maps.places_v1 import AutocompletePlacesRequest, GetPlaceRequest
from schemas.place import AutoCompleteRequest, AutoCompleteResponse, AutoCompleteSearchResult, GetPlaceDetailRequest, GetPlaceDetailResponse, PlaceDetailData, LatLng, DisplayName, Bounds
from fastapi import APIRouter, HTTPException
from dependencies.places import client
router = APIRouter(
    prefix="/place",
    tags=["Place"]
)

@router.get('/test')
def test():
    return {
        'message': 'Location works'
    }
@router.post('/auto-complete', response_model=AutoCompleteResponse)
async def auto_complete(request: AutoCompleteRequest):
    try:
        res = await client.autocomplete_places(
            request=AutocompletePlacesRequest(
            input=request.text,
            session_token=request.session_token,
            included_region_codes=["th"],
            language_code="th",
            )
        )
    except GoogleAPICallError:
        raise HTTPException(HTTPStatus.BAD_GATEWAY, "Google API Service Error")
    return AutoCompleteResponse(
        suggests=[ 
            AutoCompleteSearchResult(place_id=suggest.place_prediction.place_id, text=suggest.place_prediction.text.text) for suggest in res.suggestions
    ]
    )
@router.post('/place-detail', response_model=GetPlaceDetailResponse)
async def get_place_detail(request: GetPlaceDetailRequest):
    try:
        res = await client.get_place(
            request=GetPlaceRequest(
                name=f"places/{request.place_id}",
                session_token=request.session_token,
                language_code='th',
            ),
            metadata=[('x-goog-fieldmask', 'id,displayName,location,viewport')],
        )
    except GoogleAPICallError:
        raise HTTPException(HTTPStatus.BAD_GATEWAY, "Google API Service Error")
    return GetPlaceDetailResponse(
        message="Success",
        details=PlaceDetailData(
            id=res.id,
            location=LatLng(
                latitude=res.location.latitude,
                longitude=res.location.longitude
            ),
            display_name=DisplayName(
                text=res.display_name.text,
                language_code=res.display_name.language_code
            ),
            bounds=Bounds(
                north=res.viewport.high.latitude,
                east=res.viewport.high.longitude,
                south=res.viewport.low.latitude,
                west=res.viewport.low.longitude
            ),
        )
    )