const startScreenShare = async (peerConnection) => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });
    } catch (error) {
        console.error("Error starting screen share:", error);
    }
};

const stopScreenShare = (stream) => {
    stream.getTracks().forEach(track => track.stop());
};

export { startScreenShare, stopScreenShare };