import Side from "../components/sidebar";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";
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

export default function Kehadiran() {
  const [kehadiranData, setKehadiranData] = useState<KehadiranRecord[]>([]);
  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(credentials);
      const mongo = await user.mongoClient("Cluster0");
      const collection = await mongo.db("iot").collection("kehadiran");
      const findKehadiran = await collection.find({});
      // console.log(findKehadiran);
      setKehadiranData(findKehadiran);
    };
    login();
  }, []);
  return (
    <>
      <Side>
        <div className="max-md:text-xs text-base pb-48 flex flex-col justify-center h-full">
          <div className="max-md:w-[80dvw] w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Kehadiran</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Hadir</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Tidak Hadir
                        </div>
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
                          <div className="text-left font-medium text-green-500">
                            {record.hadir}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap text-red-500">
                          <div className="text-left">{record.tdk_hadir}</div>
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
    </>
  );
}
