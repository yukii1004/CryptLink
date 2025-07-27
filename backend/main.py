from flask import Flask
from flask_socketio import SocketIO
from app.routes.presence import presence_bp
from app.routes.relay import relay_bp
from app.routes.sessions import session_bp

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Register Blueprints
app.register_blueprint(presence_bp)
app.register_blueprint(relay_bp)
app.register_blueprint(session_bp)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)