from utils.key import SERVER_KEY
from google.maps.places_v1 import PlacesAsyncClient
client = PlacesAsyncClient(client_options={"api_key": SERVER_KEY}) # pyrefly: ignore