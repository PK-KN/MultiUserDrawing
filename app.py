# app.py
import eventlet
eventlet.monkey_patch()
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, emit



# ------------------------------------------------------------------
# The rest of your imports MUST come AFTER the monkey_patch() call
# ------------------------------------------------------------------


# Initialize Flask App
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_secure_and_random_secret_key'

# Initialize SocketIO, using eventlet for asynchronous mode
# cors_allowed_origins="*" allows connections from any origin (e.g., your browser)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# --- HTTP Routes ---


@app.route('/')
def index():
    """Serves the main HTML page (assumes index.html is in the 'templates' folder)."""
    # Note: Ensure index.html is in a 'templates' folder, NOT 'static'
    return render_template('index.html')

# --- Socket.IO Event Handlers ---


@socketio.on('connect')
def handle_connect():
    """Handles new client connection."""
    print(f'Client connected: {request.sid}')
    # Client will send a 'join' event after connecting


@socketio.on('join')
def on_join(data):
    """Handles a user joining a specific room (drawing session)."""
    room = data.get('room', 'default_room')
    username = data.get('username', f'User_{request.sid[:4]}')

    join_room(room)

    # Broadcast status message to everyone in the room (including the new user)
    emit('status', {'msg': f'📢 {username} has joined the canvas.'}, room=room)
    print(f'{username} joined room: {room}')


@socketio.on('drawing')
def handle_drawing(data):
    """Receives drawing data and broadcasts it to all *other* users in the room."""
    room = data.get('room')
    line_data = data.get('line')

    # Broadcast the drawing data to all clients *in the same room* EXCLUDING the sender
    emit('drawing', {'line': line_data}, room=room, include_self=False)


@socketio.on('clear_canvas')
def handle_clear_canvas(data):
    """Receives a clear request and broadcasts it to the room."""
    room = data.get('room')

    # Emit the event to all clients in the room, so everyone clears their canvas
    emit('clear_canvas', room=room, include_self=True)
    print(f'Canvas cleared in room: {room}')


@socketio.on('disconnect')
def handle_disconnect():
    """Handles client disconnection."""
    print(f'Client disconnected: {request.sid}')


# --- Run the Application ---
if __name__ == '__main__':
    # Flask-SocketIO runs the application using the eventlet server
    # because async_mode='eventlet' was specified above.
    socketio.run(app, debug=True, port=5000)
