import { useState, ChangeEvent, DragEvent } from "react";
import Side from "../components/sidebar";
import { RiImageLine, RiLoaderLine, RiUploadLine } from "@remixicon/react";
import axios from "axios";

export default function Tambahwajah(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [namaFile, setNamaFile] = useState<string | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [networkError, setNetworkError] = useState(false);

  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setNamaFile(event.target.value);
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
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    setNetworkError(false);
    if (!selectedImage || !namaFile || loading) return; // Prevent multiple clicks while uploading
    setLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("namaFile", namaFile);

    try {
      const res = await axios.post(
        "https://api.dprdbekasi.cloud/tambahpeserta/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(res.data);
    } catch (error) {
      setNetworkError(true);
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Side>
        <div
          className="h-[80dvh] mr-12 flex flex-col items-center justify-center"
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
                  className="relative cursor-pointer bg-blue-100 px-4 py-2 rounded-xl flex flex-col items-center justify-between w-full h-full text-center"
                >
                  <span>Masukan Gambar</span>
                  <RiImageLine className=""></RiImageLine>
                  <input
                    type="file"
                    id="fileInput"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <input
                className="w-full h-full p-2 rounded-xl text-center outline outline-1 outline-black focus:outline-2 focus:outline-blue-400"
                type="text"
                placeholder="Nama Peserta"
                onChange={handleInputName}
              />
              <button
                className={`w-full h-full p-2 rounded-xl ${
                  loading ? "bg-red-200" : "bg-green-200"
                }`}
                onClick={uploadImage}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <span>Loading...</span>
                    <RiLoaderLine className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center flex-col justify-between p-2">
                    <p>Upload</p>
                    <RiUploadLine className=""></RiUploadLine>
                  </div>
                )}
              </button>
              {networkError && (
                <div className="text-red-500 w-full h-full">
                  Jaringan Bermasalah Silahkan Ulangi Lagi
                </div>
              )}
              {response != null &&
                response.message &&
                response.message == "Image received and saved successfully" && (
                  <div className="text-black">
                    Wajah {namaFile} Telah Didaftarkan
                  </div>
                )}
            </div>
          </div>
        </div>
      </Side>
    </>
  );
}
