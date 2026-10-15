export interface AutoCompleteSearchResult {
  place_id: string;
  text: string;
}
export interface AutoCompleteSearchRequest {
  text: string;
  session_token: string;
  center: LatLng | null;
  radius: number | null;
}
export interface AutoCompleteSearchResponse {
  suggests: AutoCompleteSearchResult[];
}
export interface GetPlaceDetailRequest {
  place_id: string;
  session_token: string;
}
export interface DisplayName {
  text: string;
  language_code: string;
}
export interface LatLng {
  latitude: number;
  longitude: number;
}
export interface Bounds {
  north: number;
  east: number;
  south: number;
  west: number;
}
export interface PlaceDetailData {
  id: string;
  display_name: DisplayName;
  location: LatLng;
  bounds: Bounds;
}
export interface GetPlaceDetailResponse {
  message: string;
  details: PlaceDetailData;
}
