// AttendanceCapture.js
import Webcam from "react-webcam";

const AttendanceCapture = ({
  setWebcamRef,
  capturedImage,
  showCamera,
  handleOpenCamera,
}) => {
  return (
    <div>
      {capturedImage ? (
        <div>
          <h2 className="font-bold mb-2">Captured Image:</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      ) : (
        <div>
          <h2 className="font-bold mb-2">Live Camera:</h2>
          {showCamera ? (
            <Webcam
              audio={false}
              ref={(webcam) => setWebcamRef(webcam)}
              screenshotFormat="image/jpeg"
              autoPlay={true}
              screenshotQuality={0.4}
            />
          ) : (
            <button
              className="btn_green text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleOpenCamera}
            >
              Open Camera
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceCapture;
