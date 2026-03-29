
# ✏️ Real-Time Multi-User Drawing Web App  

A collaborative, real-time drawing canvas built with **Flask** and **Socket.IO**, enabling multiple users to sketch together seamlessly.  

## ✨ Features  
- 🔄 **Real-time synchronization**: Every stroke instantly appears for all connected users.  
- 🎨 **Drawing tools**: Choose brush color, adjust size, and clear the canvas.  
- 🏠 **Multi-room support**: Each room has its own independent canvas (default: `default_room`).  
- 👥 **Collaborative experience**: Multiple users can draw simultaneously without conflicts.  

## 🛠️ Tech Stack  
- **Backend:** Python, Flask, Flask-SocketIO (with `eventlet` for async handling)  
- **Frontend:** HTML5 Canvas, JavaScript, Socket.IO Client  
- **Templating:** Jinja2 (Flask)  

## 🚀 How It Works  
1. **Client-side:**  
   - Captures mouse/touch events on the canvas.  
   - Sends drawing data (coordinates, color, brush size) to the server via Socket.IO.  
   - Listens for updates and renders strokes from other users in real time.  

2. **Server-side:**  
   - Manages WebSocket connections.  
   - Broadcasts drawing events to all users in the same room.  
   - Handles room separation and canvas clearing.  

## 🚀 Setup and Run Locally

### Prerequisites

- Python 3.8+
- `pip` (Python package installer)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PK-KN/MultiUserDrawing.git
   
cd MultiUserDrawing

2. **Create and activate a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

3.	**Install dependencies:**
   ```bash
   pip install -r requirements.txt
```

4.	**Run the server:**
   ```bash
   python app.py
```

5. **Access the App:** Open your browser and navigate to http://127.0.0.1:5000/.


