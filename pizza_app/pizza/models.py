import json
from pathlib import Path

DATA_FILE = Path("data.json")

def read_data():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return []

def write_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)
