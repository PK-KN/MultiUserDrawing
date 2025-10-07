# ✏️ Real-Time Multi-User Drawing Web App

A collaborative, real-time drawing canvas built with Flask and Socket.IO.

## ✨ Features

- Real-time drawing synchronization across all connected users.
- Basic drawing tools (color, size, clear canvas).
- Multi-room capability (currently defaulted to 'default_room').

## 🛠️ Tech Stack

- **Backend:** Python, Flask, Flask-SocketIO (using `eventlet` for asynchronous handling)
- **Frontend:** HTML5 Canvas, JavaScript, Socket.IO Client
- **Templating:** Jinja2 (Flask)

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


