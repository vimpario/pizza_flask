from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from pizza_app.pizza.views import pizza_bp
    app.register_blueprint(pizza_bp, url_prefix='/api')
    
    return app
