import { useState, ChangeEvent, DragEvent } from "react";
import Side from "../components/sidebar";
import { RiFileUploadLine } from "@remixicon/react";
import axios from "axios";

export default function Tambahwajah(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [namaFile, setnamaFile] = useState<string | null>(null);
  const [response, setresponse] = useState<any | null>(null);
  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setnamaFile(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onload = () => {
        setSelectedImage(reader.result as string); // Set the selected image to the file content
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const uploadImage = async () => {
    if (!selectedImage || !namaFile) return;
    const formData = new FormData();

    const img = new Image();
    img.src = selectedImage;
    // Wait for the image to load
    img.onload = async () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");

      // Calculate new width and height for resizing (e.g., 50% reduction)
      const newWidth = img.width * 0.5;
      const newHeight = img.height * 0.5;

      // Set canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Get the 2d context of the canvas
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Draw the image onto the canvas with the new dimensions
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert the canvas content to a base64 encoded string
      const resizedImage = canvas.toDataURL("image/jpeg");

      const binaryString = atob(resizedImage.split(",")[1]);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/jpeg" });
      formData.append("image", blob, namaFile + ".jpg");

      try {
        const response = await axios.post(
          "https://api.dprdbekasi.cloud/tambahpeserta/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setresponse(response);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };

  return (
    <>
      <Side>
        <div
          className="h-[80dvh] mt-12 mr-12 flex flex-col items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="font-semibold text-gray-800">Tambah Peserta</h2>
          <div className="w-[80dvw] flex max-md:flex-col gap-2 justify-center items-center p-4 rounded-lg shadow-xl bg-slate-50">
            <div
              className="w-[300px] h-[300px] border-dashed border-2 border-gray-400 rounded-lg flex justify-center items-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <span className="text-gray-500">Drag & drop</span>
              )}
            </div>
            <div className="rounded-lg p-4 flex flex-col gap-4 justify-center items-center">
              <div className="flex justify-center items-center w-full h-full">
                <label
                  htmlFor="fileInput"
                  className="relative cursor-pointer bg-blue-100 px-4 py-2 rounded-xl flex items-center w-full h-full text-center"
                >
                  <span>Masukan Gambar</span>
                  <RiFileUploadLine className="m-auto"></RiFileUploadLine>
                  <input
                    type="file"
                    id="fileInput"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <input
                className="p-2 rounded-xl text-center outline outline-1 outline-black focus:outline-2 focus:outline-blue-400"
                type="text"
                placeholder="Nama Peserta"
                onChange={handleInputName}
              />
              <button
                className="w-full h-full bg-green-200 p-2 rounded-xl"
                onClick={uploadImage}
              >
                <p>Upload</p>
              </button>
              {response && <div>{response}</div>}
            </div>
          </div>
        </div>
      </Side>
    </>
  );
}
