let localStream = null;
let cameraStream = null;
let screenStream = null;
let isScreenSharing = false;
let peer = null;
let conn = null;
let call = null;
let remoteId = null;

window.onload = function() {
    // ...existing UI event handlers...

    document.getElementById('createRoomBtn').onclick = async function() {
        const roomId = Math.random().toString(36).substring(2, 10);
        document.getElementById('createdRoomId').textContent = roomId;
        document.getElementById('createdRoomInfo').style.display = 'block';
        await showCallScreen(roomId, true);
    };

    document.getElementById('joinRoomBtn').onclick = async function() {
        const roomId = document.getElementById('roomIdInput').value.trim();
        if (roomId) {
            await showCallScreen(roomId, false);
        } else {
            alert('Please enter a Room ID.');
        }
    };

    // ...mute, camera, screenshare, end-call handlers (same as before)...
};

async function showCallScreen(roomId, isHost) {
    document.getElementById('landing-container').style.display = 'none';
    document.getElementById('call-screen').style.display = 'block';
    document.getElementById('room-id-display').textContent = `Room ID: ${roomId}`;

    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream = cameraStream;
    document.getElementById('local-video').srcObject = cameraStream;

    peer = new Peer(roomId, {
        host: "peerjs.com",
        port: 443,
        secure: true
    });

    peer.on('open', id => {
        if (!isHost) {
            // Joiner calls host
            call = peer.call(roomId, localStream);
            call.on('stream', remoteStream => {
                document.getElementById('remote-video').srcObject = remoteStream;
            });
        }
    });

    peer.on('call', incomingCall => {
        // Host answers joiner
        call = incomingCall;
        call.answer(localStream);
        call.on('stream', remoteStream => {
            document.getElementById('remote-video').srcObject = remoteStream;
        });
    });
}

// Screen sharing logic (add setScreenSharingLayout as before)
document.getElementById('screenshare-button').onclick = async function() {
    if (!isScreenSharing) {
        try {
            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            let tracks = [...screenStream.getVideoTracks()];
            if (cameraStream && cameraStream.getAudioTracks().length > 0) {
                tracks.push(cameraStream.getAudioTracks()[0]);
            } else if (screenStream.getAudioTracks().length > 0) {
                tracks.push(screenStream.getAudioTracks()[0]);
            }
            let combinedStream = new MediaStream(tracks);
            document.getElementById('local-video').srcObject = combinedStream;
            localStream = combinedStream;
            isScreenSharing = true;
            this.textContent = "Stop Screen Share";
            setScreenSharingLayout(true);

            // Replace video track in peer connection
            if (call && call.peerConnection) {
                const sender = call.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
                if (sender) sender.replaceTrack(screenStream.getVideoTracks()[0]);
            }

            screenStream.getVideoTracks()[0].onended = () => {
                stopScreenShare();
            };
        } catch (err) {
            alert('Screen sharing failed.');
        }
    } else {
        stopScreenShare();
    }
};

function stopScreenShare() {
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;
    }
    if (cameraStream) {
        document.getElementById('local-video').srcObject = cameraStream;
        localStream = cameraStream;
        // Replace video track in peer connection
        if (call && call.peerConnection) {
            const sender = call.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
            if (sender) sender.replaceTrack(cameraStream.getVideoTracks()[0]);
        }
    }
    isScreenSharing = false;
    document.getElementById('screenshare-button').textContent = "Start Screen Share";
    setScreenSharingLayout(false);
}

// Add setScreenSharingLayout helper as before
function setScreenSharingLayout(isSharing) {
    const container = document.querySelector('.video-container');
    if (isSharing) {
        container.classList.add('screensharing');
    } else {
        container.classList.remove('screensharing');
    }
}