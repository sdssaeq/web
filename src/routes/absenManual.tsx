import { useState } from "react";
import Side from "../components/sidebar";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
// import axios from "axios";
// import * as Realm from "realm-web";

// const APP_ID = "data-wzvck";
// const app = new Realm.App({ id: APP_ID });
// const credentials = Realm.Credentials.apiKey(
//   "r7WRET3thOH7CXWdLzJCnxyPvYznPZFrbjZeN1PW2QPfzcbLIL3RXXFlbP3mM0eO"
// );

export default function AbsenManual() {
  const [image, setImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  );

  const toggleFacingMode = () => {
    const newFacingMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newFacingMode);
  };

  const handleTakePhoto = (dataUri: string) => {
    setImage(dataUri);
    console.log(dataUri);
  };

  // const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.readyState === FileReader.DONE) {
  //         const arrayBuffer = reader.result as ArrayBuffer;
  //         const uint8Array = new Uint8Array(arrayBuffer);
  //         sendImageDataToServer(uint8Array);
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const sendImageDataToServer = async (imageData: Uint8Array) => {
  //   try {
  //     const url = "http://192.168.0.3:8080/test/";
  //     const data = {
  //       gambar: imageData,
  //     };
  //     const headers = {
  //       apikey:
  //         "2xyduuL3bxdCUTekwPRLdHlIeq3t5hHhKi62RKlkMQbH7BTHNGImZjpNxrdHme61",
  //     };
  //     const res = await axios.post(url, data, { headers });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <>
      <Side>
        <div className="pt-16 max-md:text-xs text-base gap-10">
          {/* <div className="flex justify-center items-center bg-red-500 max-md:pr-6 pt-20"> */}
          {/* className="max-md:text-xs text-base h-[70dvh] max-md:w-[80dvw] rounded-lg border border-gray-200 p-4" */}
          {/* <div className="max-md:text-xs text-base h-[70dvh] max-md:w-[80dvw] rounded-lg border border-gray-200 p-4"> */}
          <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 p-4 mr-6">
            <h1 className="font-bold mb-4">Absen Manual</h1>
            <div className="w-[50dvh]">
              {image ? (
                <img src={image} alt="Uploaded" />
              ) : (
                <Camera
                  idealFacingMode={facingMode}
                  idealResolution={{ width: 480, height: 640 }}
                  isFullscreen={false}
                  isImageMirror={false}
                  onTakePhoto={(dataUri: string) => handleTakePhoto(dataUri)}
                />
              )}
            </div>
            <div className="pt-8 pb-2">
              <button
                className="outline outline-1 rounded-lg outline-offset-8"
                onClick={toggleFacingMode}
              >
                <p>Ganti Kamera</p>
              </button>
            </div>
          </div>
        </div>
      </Side>
    </>
  );
}
