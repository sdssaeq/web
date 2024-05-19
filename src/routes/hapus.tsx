import { useEffect, useState } from "react";
import Side from "../components/sidebar";
import * as Realm from "realm-web";
import axios from "axios";
import { RiDeleteBinLine } from "@remixicon/react";
const APP_ID = "data-wzvck";
const app = new Realm.App({ id: APP_ID });
const credentials = Realm.Credentials.apiKey(
  "r7WRET3thOH7CXWdLzJCnxyPvYznPZFrbjZeN1PW2QPfzcbLIL3RXXFlbP3mM0eO"
);

interface KehadiranRecord {
  nama: string;
  tdk_hadir: number;
  hadir: number;
}

export default function Hapuswajah() {
  const [kehadiranData, setKehadiranData] = useState<KehadiranRecord[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string>("");
  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(credentials);
      const mongo = await user.mongoClient("Cluster0");
      const collection = await mongo.db("iot").collection("kehadiran");
      const findKehadiran = await collection.find({});
      setKehadiranData(findKehadiran);
    };
    login();
  }, []);
  const handleDeleteConfirmation = (name: string) => {
    setSelectedRecord(name);
    setShowConfirmation(true);
  };
  const handleDeleteCanceled = () => {
    setShowConfirmation(false);
  };
  const handleButtonClick = async () => {
    try {
      const data = { nama: selectedRecord };
      await axios.post("http://localhost:8080/hapuspeserta/", data);
      const user = await app.logIn(credentials);
      const mongo = await user.mongoClient("Cluster0");
      const collection = await mongo.db("iot").collection("kehadiran");
      const findKehadiran = await collection.find({});
      setKehadiranData(findKehadiran);
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <Side>
        <div className="max-md:text-xs text-base pb-48 flex flex-col justify-center h-full">
          <div className="max-md:w-[80dvw] w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Kehadiran</h2>
            </header>
            <div className="h-[50dvh] p-3 overflow-y-scroll">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Hadir</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Tidak Hadir
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Hapus</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {kehadiranData.map((record, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {record.nama}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            {record.hadir}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap text-red-500">
                          <div className="text-center">{record.tdk_hadir}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap text-white bg-red-500 rounded-xl">
                          <div className="text-center">
                            <button
                              onClick={() =>
                                handleDeleteConfirmation(record.nama)
                              }
                            >
                              {<RiDeleteBinLine />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Side>
      {showConfirmation && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <p className="text-lg font-semibold mb-3">
              Data {selectedRecord} Akan Dihapus
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                className="bg-red-500 text-white px-4 py-2 mr-4 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleDeleteCanceled}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
