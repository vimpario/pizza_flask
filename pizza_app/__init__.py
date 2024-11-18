from http.client import HTTPException
from flask import Flask, jsonify

def create_app():
    app = Flask(__name__)
    
    from pizza_app.pizza.views import pizza_bp
    app.register_blueprint(pizza_bp, url_prefix='/api')
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        return jsonify({"error": e.description}), e.code
    
    @app.errorhandler(500)
    def handle_internal_error(e):
        return jsonify({"error": "An unexpected error occurred"}), 500

    return app
