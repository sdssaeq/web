import { useState, ChangeEvent } from "react";
import Side from "../components/sidebar";

export default function Tambahwajah(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const uploadImage = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(
        "https://api.dprdbekasi.cloud/tambahpeserta/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: selectedImage }),
        }
      );

      if (response.ok) {
        console.log("Image uploaded successfully");
        // Optionally, reset the selectedImage state
        setSelectedImage(null);
      } else {
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Side>
        <div className="h-full flex items-center justify-center">
          <div className="flex gap-2 justify-center items-center bg-slate-200 p-4 rounded-lg">
            <div>
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </div>
              )}
            </div>
            <div className="bg-slate-100 rounded-lg p-4">
              <input type="file" name="" id="" onChange={handleImageChange} />
              <button onClick={uploadImage}>Upload Image</button>
            </div>
          </div>
        </div>
      </Side>
    </>
  );
}
