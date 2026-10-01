import os
import httpx2
import logging

log = logging.getLogger(__name__)
BASE_URL = "http://localhost:8000"

def test_health():
    log.info("Fetch /health endpoint")
    response = httpx2.get(f"{BASE_URL}/health")
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}