from flask import Blueprint, request, jsonify
from .models import read_data, write_data

pizza_bp = Blueprint('hello', __name__)

@pizza_bp.route('/data', methods=['GET'])
def get_data():
    data = read_data()
    return jsonify(data)

@pizza_bp.route('/data', methods=['POST'])
def add_data():
    new_entry = request.json
    if not new_entry:
        return jsonify({"error": "No data provided"}), 400
    
    data = read_data()
    data.append(new_entry)
    write_data(data)
    
    return jsonify({"message": "Data added successfully"}), 201
