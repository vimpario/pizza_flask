from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from my_app.hello.views import hello_bp
    app.register_blueprint(hello_bp, url_prefix='/api')
    
    return app
