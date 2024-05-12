import { useState } from "react";
import Side from "../components/sidebar";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";
// import * as Realm from "realm-web";

// const APP_ID = "data-wzvck";
// const app = new Realm.App({ id: APP_ID });
// const credentials = Realm.Credentials.apiKey(
//   "r7WRET3thOH7CXWdLzJCnxyPvYznPZFrbjZeN1PW2QPfzcbLIL3RXXFlbP3mM0eO"
// );

export default function AbsenManual() {
  const [image, setImage] = useState<string | null>(null);
  const [dataRequest, setDataRequest] = useState<any>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  );

  const toggleFacingMode = () => {
    const newFacingMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newFacingMode);
  };

  const handleTakePhoto = (dataUri: string) => {
    const imageData = dataUri.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    setImage(dataUri);
    const binaryString = atob(imageData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    // console.log(bytes);
    sendImageDataToServer(bytes);
  };

  const sendImageDataToServer = async (blob: any) => {
    try {
      const res = await axios.post(
        "https://api.dprdbekasi.cloud/absensi/",
        blob
      );
      console.log(res.data);
      setDataRequest(res.data);
    } catch (error) {
      console.error("Error sending image data to server:", error);
    }
  };

  return (
    <>
      <Side>
        <div className="pt-16 lg:pt-0 max-md:text-xs text-base gap-10">
          <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 p-4 mr-6">
            <h1 className="font-bold mb-4">Absen Manual</h1>
            <div className="w-[50dvh] lg:h-[40dvh]">
              {image ? (
                <img src={image} alt="Uploaded" />
              ) : (
                <Camera
                  imageType="jpg"
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
            {dataRequest && dataRequest[0] == "Tidak Terbaca" ? (
              <div className="pt-8 pb-2">
                <p className="text-xl">Gambar Tidak Ada Wajah</p>
              </div>
            ) : (
              <div></div>
            )}
            {dataRequest &&
            dataRequest[0] !== "ANOMALI" &&
            dataRequest[0] !== "Tidak Terbaca" ? (
              <div className="pt-8 pb-2">
                <p className="text-xl">
                  Hallo {dataRequest[0]} Anda Sudah Absen
                </p>
              </div>
            ) : (
              dataRequest &&
              dataRequest[0] === "ANOMALI" && (
                <div className="pt-8 pb-2">
                  <p className="text-xl">Wajah Tidak Terdekteksi</p>
                </div>
              )
            )}
          </div>
        </div>
      </Side>
    </>
  );
}
