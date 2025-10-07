// // --- 1. Setup ---
// // The socket object automatically connects to the server hosting the page
// const socket = io();

// // Canvas DOM and Context
// const canvas = document.getElementById('drawing-canvas');
// const ctx = canvas.getContext('2d');
// const statusLog = document.getElementById('status-log');

// // Drawing state variables
// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;
// let color = document.getElementById('color-picker').value;
// let size = parseInt(document.getElementById('size-slider').value);
// const roomID = 'default_room'; // All users join this room for now

// // --- 2. Canvas Drawing Function ---
// function drawLine(x1, y1, x2, y2, strokeColor, strokeSize) {
//     ctx.beginPath();
//     ctx.strokeStyle = strokeColor;
//     ctx.lineWidth = strokeSize;
//     ctx.lineCap = 'round';
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
// }


// // --- 3. Socket.IO Client Events (Receiving) ---

// socket.on('connect', () => {
//     statusLog.textContent = 'Status: Connected to server.';

//     // Prompt for username and send 'join' event
//     const username = prompt("Welcome! Please enter your username:") || `Guest_${Math.floor(Math.random() * 999)}`;
//     socket.emit('join', { room: roomID, username: username });
// });

// socket.on('drawing', (data) => {
//     // Received a line from another user, draw it on our canvas
//     const line = data.line;
//     drawLine(line.startX, line.startY, line.endX, line.endY, line.color, line.size);
// });

// socket.on('status', (data) => {
//     // Received a status update (e.g., user joined)
//     console.log(data.msg);
//     statusLog.textContent = `Status: ${data.msg}`;
// });


// // --- 4. Mouse Event Listeners (Sending) ---

// canvas.addEventListener('mousedown', (e) => {
//     isDrawing = true;
//     // Update last position to the current mouse position
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// });

// canvas.addEventListener('mousemove', (e) => {
//     if (!isDrawing) return;

//     // 1. Draw locally first for instant feedback
//     drawLine(lastX, lastY, e.offsetX, e.offsetY, color, size);

//     // 2. Prepare data for server broadcast
//     const lineData = {
//         startX: lastX,
//         startY: lastY,
//         endX: e.offsetX,
//         endY: e.offsetY,
//         color: color,
//         size: size,
//     };

//     // 3. Emit drawing event to the server
//     socket.emit('drawing', { room: roomID, line: lineData });

//     // 4. Update coordinates for the next segment
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// });

// // Stop drawing on mouse up or leaving the canvas area
// canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);


// // --- 5. Tool Control Event Listeners ---

// // Color Picker
// document.getElementById('color-picker').addEventListener('change', (e) => {
//     color = e.target.value;
// });

// // Size Slider
// document.getElementById('size-slider').addEventListener('input', (e) => {
//     size = parseInt(e.target.value);
// });

// // Clear Button
// document.getElementById('clear-button').addEventListener('click', () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // TODO: Emit an event to the server to tell *all* users to clear their canvas too.
// });


// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Setup & Initialization ---

    // The socket object automatically connects to the server hosting the page
    const socket = io('http://127.0.0.1:5000');

    // DOM Elements and Canvas Context
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const statusLog = document.getElementById('status-log');
    const colorPicker = document.getElementById('color-picker');
    const sizeSlider = document.getElementById('size-slider');
    const clearButton = document.getElementById('clear-button');

    // Drawing state variables (Now safely initialized after DOM is ready)
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let color = colorPicker.value; // Initialize with current picker value
    let size = parseInt(sizeSlider.value); // Initialize with current slider value
    const roomID = 'default_room'; // All users join this room for now

    // --- 2. Canvas Drawing Function ---
    function drawLine(x1, y1, x2, y2, strokeColor, strokeSize) {
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeSize;
        ctx.lineCap = 'round';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }


    // --- 3. Socket.IO Client Events (Receiving) ---

    socket.on('connect', () => {
        statusLog.textContent = 'Status: Connected to server.';

        // Prompt for username and send 'join' event
        const username = prompt("Welcome! Please enter your username:") || `Guest_${Math.floor(Math.random() * 999)}`;
        socket.emit('join', { room: roomID, username: username });
    });

    socket.on('drawing', (data) => {
        // Received a line from another user, draw it on our canvas
        const line = data.line;
        drawLine(line.startX, line.startY, line.endX, line.endY, line.color, line.size);
    });

    // Handler for the "Clear Canvas" broadcast event
    socket.on('clear_canvas', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        statusLog.textContent = `Status: Canvas was cleared by a user.`;
    });

    socket.on('status', (data) => {
        // Received a status update (e.g., user joined)
        console.log(data.msg);
        statusLog.textContent = `Status: ${data.msg}`;
    });


    // --- 4. Mouse Event Listeners (Sending) ---

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;

        // 1. Draw locally first for instant feedback
        drawLine(lastX, lastY, e.offsetX, e.offsetY, color, size);

        // 2. Prepare data for server broadcast
        const lineData = {
            startX: lastX,
            startY: lastY,
            endX: e.offsetX,
            endY: e.offsetY,
            color: color,
            size: size,
        };

        // 3. Emit drawing event to the server
        socket.emit('drawing', { room: roomID, line: lineData });

        // 4. Update coordinates for the next segment
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);


    // --- 5. Tool Control Event Listeners (Now using descriptive variables) ---

    // Color Picker
    colorPicker.addEventListener('change', (e) => {
        color = e.target.value;
    });

    // Size Slider
    sizeSlider.addEventListener('input', (e) => {
        size = parseInt(e.target.value);
    });

    // Clear Button (Now includes the network broadcast logic)
    clearButton.addEventListener('click', () => {
        // 1. Clear locally
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Emit an event to the server to tell *all* users to clear their canvas
        socket.emit('clear_canvas', { room: roomID });
    });
}); // End of DOMContentLoaded