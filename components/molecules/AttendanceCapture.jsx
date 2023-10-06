// AttendanceCapture.js
import Webcam from "react-webcam";

const AttendanceCapture = ({ setWebcamRef, capturedImage }) => {
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
          <Webcam
            audio={false}
            ref={(webcam) => setWebcamRef(webcam)}
            screenshotFormat="image/jpeg"
          />
        </div>
      )}
    </div>
  );
};

export default AttendanceCapture;
