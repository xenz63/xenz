const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        }
    ]
};

let localStream;
let remoteStream;
let peerConnection;

const roomIdInput = document.getElementById('room-id');
const joinButton = document.getElementById('join-button');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

joinButton.addEventListener('click', async () => {
    const roomId = roomIdInput.value;
    if (roomId) {
        await startConnection(roomId);
    }
});

async function startConnection(roomId) {
    peerConnection = new RTCPeerConnection(configuration);

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Send the candidate to the remote peer
            sendMessage(roomId, { 'ice': event.candidate });
        }
    };

    peerConnection.ontrack = event => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };

    localVideo.srcObject = localStream;

    // Create an offer and set local description
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer to the remote peer
    sendMessage(roomId, { 'sdp': offer });
}

function sendMessage(roomId, message) {
    // Implement your signaling logic here (e.g., using WebSocket or Firebase)
}

function handleMessage(message) {
    if (message.ice) {
        peerConnection.addIceCandidate(new RTCIceCandidate(message.ice));
    } else if (message.sdp) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
        if (message.sdp.type === 'offer') {
            peerConnection.createAnswer().then(answer => {
                peerConnection.setLocalDescription(answer);
                sendMessage(roomId, { 'sdp': answer });
            });
        }
    }
}