const ui = (() => {
    const roomIdInput = document.getElementById('room-id');
    const joinButton = document.getElementById('join-button');
    const muteButton = document.getElementById('mute-button');
    const cameraButton = document.getElementById('camera-button');
    const screenShareButton = document.getElementById('screen-share-button');
    const endCallButton = document.getElementById('end-call-button');

    const init = () => {
        joinButton.addEventListener('click', joinRoom);
        muteButton.addEventListener('click', toggleMute);
        cameraButton.addEventListener('click', toggleCamera);
        screenShareButton.addEventListener('click', toggleScreenShare);
        endCallButton.addEventListener('click', endCall);
    };

    const joinRoom = () => {
        const roomId = roomIdInput.value;
        if (roomId) {
            // Logic to join the room
        }
    };

    const toggleMute = () => {
        // Logic to mute/unmute the microphone
    };

    const toggleCamera = () => {
        // Logic to turn the camera on/off
    };

    const toggleScreenShare = () => {
        // Logic to start/stop screen sharing
    };

    const endCall = () => {
        // Logic to end the call
    };

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', ui.init);