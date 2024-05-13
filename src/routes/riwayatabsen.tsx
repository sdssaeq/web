import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Side from "../components/sidebar";
import { RiSearch2Line } from "@remixicon/react";
const APP_ID = "data-wzvck";
const app = new Realm.App({ id: APP_ID });
const credentials = Realm.Credentials.apiKey(
  "r7WRET3thOH7CXWdLzJCnxyPvYznPZFrbjZeN1PW2QPfzcbLIL3RXXFlbP3mM0eO"
);

interface RiwayatRecord {
  _id: string;
  nama: string;
  gambar: string;
  tanggal: Date;
}

export default function RiwayatAbsen() {
  const [AbsenData, setAbsenData] = useState<RiwayatRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initialData, setInitialData] = useState<RiwayatRecord[]>([]);
  const [searchResult, setSearchResult] = useState<RiwayatRecord[]>([]);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(credentials);
      const mongo = await user.mongoClient("Cluster0");
      const collection = await mongo.db("iot").collection("absensi");
      const findAll = await collection.find({});
      setAbsenData(findAll);
      setInitialData(findAll);
    };
    login();
    console.log(selectedDate, searchName, searchResult);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    if (selectedDate) {
      const result = AbsenData.filter((record) => {
        const recordDate = new Date(record.tanggal);
        return (
          recordDate.getFullYear() === selectedDate.getFullYear() &&
          recordDate.getMonth() === selectedDate.getMonth() &&
          recordDate.getDate() === selectedDate.getDate()
        );
      });
      setSearchResult(result);
    }
  };

  const handleNameSearch = () => {
    if (searchName) {
      const result = AbsenData.filter((record) => {
        // Check if the name matches at least three characters
        const matchCount = record.nama
          .toLowerCase()
          .split("")
          .filter(
            (char, index) => searchName.toLowerCase()[index] === char
          ).length;
        return matchCount >= 3;
      });
      setSearchResult(result);
    }
  };

  function isOnTime(dateString: Date) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Check if the time is before 7:40 AM
    return hours === 7 && minutes >= 0 && minutes < 40;
  }

  return (
    <>
      <Side>
        <div className="max-md:text-xs text-base pb-12 xl:pt-0 pt-24 max-md:pt-0 max-md:pr-4 flex flex-col justify-center h-full">
          <div className="max-md:w-[90dvw] w-[100dvw] max-md:h-[80dvh] max-lg:h-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 overflow-y-scroll">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Riwayat</h2>
            </header>
            <div className="p-3">
              <div className="flex items-center justify-end space-x-4 max-md:space-x-1 mb-4">
                <input
                  className="w-full h-7 border-2 border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg"
                  type="date"
                  onChange={(e) => handleDateClick(new Date(e.target.value))}
                />
                <button
                  className="h-12 w-24 px-4 py-2 max-md:w-18 max-md:px-1 max-md:py-0 max-md:h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleSearch}
                >
                  <div className="flex flex-row gap-1 items-center justify-center">
                    <p>Tanggal</p>
                    <span>{<RiSearch2Line size={12} />}</span>
                  </div>
                </button>
                <input
                  className="max-md:w-16 h-7 p-1 border-2 border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg"
                  type="text"
                  placeholder="Nama"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <button
                  className="h-12 w-24 px-4 py-2 max-md:w-16 max-md:px-1 max-md:py-0 max-md:h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleNameSearch}
                >
                  <div className="flex flex-row gap-1 items-center justify-center">
                    <p>Nama</p>
                    <span>{<RiSearch2Line size={12} />}</span>
                  </div>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Gambar</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Status</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Waktu</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Tanggal</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {searchName === "" &&
                      selectedDate === null &&
                      initialData.map((record, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <img
                              className="w-40"
                              src={`data:image/webp;base64,${record.gambar}`}
                              alt={record.nama}
                            />
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                {record.nama}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div
                              className={`text-center ${
                                isOnTime(record.tanggal)
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <p>
                                {isOnTime(record.tanggal)
                                  ? "Tepat Waktu"
                                  : "Telat"}
                              </p>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div
                              className={`text-center ${
                                isOnTime(record.tanggal)
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <p>
                                {new Date(record.tanggal).toLocaleTimeString(
                                  "en-US",
                                  { hour12: false }
                                )}
                              </p>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">
                              <p>
                                {new Date(record.tanggal).toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {selectedDate && searchResult.length === 0 ? (
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          No data found for {selectedDate.getDate()}/
                          {selectedDate.getMonth() + 1}/
                          {selectedDate.getFullYear()}
                        </td>
                      </tr>
                    ) : (
                      searchResult.map((record, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <img
                              className="w-40"
                              src={`data:image/webp;base64,${record.gambar}`}
                              alt={record.nama}
                            />
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                {record.nama}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div
                              className={`text-center ${
                                isOnTime(record.tanggal)
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <p>
                                {isOnTime(record.tanggal)
                                  ? "Tepat Waktu"
                                  : "Telat"}
                              </p>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div
                              className={`text-center ${
                                isOnTime(record.tanggal)
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <p>
                                {new Date(record.tanggal).toLocaleTimeString(
                                  "en-US",
                                  { hour12: false }
                                )}
                              </p>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">
                              <p>
                                {new Date(record.tanggal).toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Side>
    </>
  );
}
