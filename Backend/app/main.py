# main.py (FastAPI Backend)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests, os
from dotenv import load_dotenv
from collections import defaultdict

load_dotenv()
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

app = FastAPI()

# ✅ Enable CORS for frontend on port 5174
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # not safe for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/restaurants")
def get_restaurants(lat: float, lng: float, radius: int = 16000):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": "restaurant",
        "key": GOOGLE_PLACES_API_KEY
    }

    r = requests.get(url, params=params)
    results = r.json().get("results", [])

    grouped = defaultdict(list)
    for place in results:
        types = place.get("types", [])
        matched = False
        for tag in types:
            category = normalize_cuisine(tag)
            if category:
                grouped[category].append(place)
                matched = True
                break
        if not matched:
            grouped["other"].append(place)

    return grouped

def normalize_cuisine(tag: str) -> str:
    known = {
        "indian_restaurant": "indian",
        "mexican_restaurant": "mexican",
        "chinese_restaurant": "chinese",
        "italian_restaurant": "italian",
        "japanese_restaurant": "japanese",
        "thai_restaurant": "thai",
        "pizza_place": "pizza",
        "korean_restaurant": "korean",
    }
    return known.get(tag)

@app.get("/vacation_spots")
def get_vacation_spots(lat: float, lng: float, radius: int = 16000):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": "tourist_attraction",
        "key": GOOGLE_PLACES_API_KEY
    }

    r = requests.get(url, params=params)
    results = r.json().get("results", [])

    grouped = defaultdict(list)
    for place in results:
        types = place.get("types", [])
        matched = False
        for tag in types:
            category = normalize_vacation(tag)
            if category:
                grouped[category].append(place)
                matched = True
                break
        if not matched:
            grouped["other"].append(place)

    return grouped

def normalize_vacation(tag: str) -> str:
    known = {
        "park": "parks",
        "museum": "museums",
        "tourist_attraction": "landmarks",
        "zoo": "zoos",
        "art_gallery": "galleries",
    }
    return known.get(tag)