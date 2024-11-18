import json
from flask import Blueprint, request, jsonify, render_template
from .models import read_data, write_data

pizza_bp = Blueprint('pizza_data', __name__)



@pizza_bp.route('/data', methods=['GET'])
def get_data():
    try:
        data = read_data()
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "Data file not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@pizza_bp.route('/')
def index():
    return render_template('index.html')

@pizza_bp.route('/data', methods=['POST'])
def add_data():
    try:
        new_entry = request.json
        if not new_entry:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate required fields
        required_fields = ['name', 'price', 'description']
        missing_fields = [field for field in required_fields if field not in new_entry]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        # Validate data types
        if not isinstance(new_entry['name'], str) or not new_entry['name'].strip():
            return jsonify({"error": "Invalid 'name', must be a non-empty string"}), 400
        if not isinstance(new_entry['price'], (int, float)) or new_entry['price'] <= 0:
            return jsonify({"error": "Invalid 'price', must be a positive number"}), 400
        if not isinstance(new_entry['description'], str) or not new_entry['description'].strip():
            return jsonify({"error": "Invalid 'description', must be a non-empty string"}), 400
        
        # Add data
        data = read_data()
        data.append(new_entry)
        write_data(data)
        
        return jsonify({"message": "Data added successfully"}), 201
    except FileNotFoundError:
        return jsonify({"error": "Data file not found"}), 500
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500