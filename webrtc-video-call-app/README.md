# WebRTC Video Call App

This project is a fully responsive web application that allows two users to connect via peer-to-peer video calls and screen sharing using WebRTC technology. The application features a simple Room ID input for joining calls without the need for authentication.

## Features

- Peer-to-peer video calling
- Screen sharing capabilities
- Simple Room ID input for easy access
- Responsive design for both desktop and mobile devices
- Clean, dark-themed interface

## Project Structure

```
webrtc-video-call-app
├── public
│   ├── index.html        # Main HTML document
│   └── styles.css       # CSS styles for the application
├── src
│   ├── main.js          # Entry point for JavaScript functionality
│   ├── webrtc.js        # WebRTC functionality for video calls
│   ├── screenshare.js    # Screen sharing functionality
│   └── ui.js            # User interface management
├── package.json         # npm configuration file
└── README.md            # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd webrtc-video-call-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Open `public/index.html` in your web browser.
2. Enter a Room ID to create or join a call.
3. Click the "Join Call" button to connect with another user.
4. Use the interface to manage video and audio settings, and to start screen sharing.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- WebRTC API

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.