import { RiUserLine, RiTrophyLine } from "@remixicon/react";
import Side from "../components/sidebar";

export default function Ranking() {
  return (
    <>
      <Side>
        {/* <div className="w-full h-full flex items-center flex-col">
          <div>
            <div className="w-[80dvw] max-md:w-[85vw] h-12 bg-sky-400 transition-all duration-300 hover:bg-sky-500 shadow-xl shadow-blue-200 rounded-lg flex justify-center items-center text-white/90 hover:text-white/70">
              <p>Ranking</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 pt-8">
            <div className="flex justify-center items-center w-[60dvw] max-md:w-[85dvw] h-24 rounded-xl shadow-xl">
              <div className="p-4">
                <div className="w-16 h-16 rounded-full bg-slate-500 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/lego/5.jpg"
                    alt="1"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2>Satrio</h2>
              </div>
              <div className="w-full flex justify-end p-4">
                <p>#1</p>
              </div>
            </div>

            <div className="flex justify-center items-center w-[60dvw] max-md:w-[85dvw] h-24 rounded-xl shadow-xl">
              <div className="p-4">
                <div className="w-16 h-16 rounded-full bg-slate-500 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/lego/6.jpg"
                    alt="2"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2>Salsa</h2>
              </div>
              <div className="w-full flex justify-end p-4">
                <p>#2</p>
              </div>
            </div>

            <div className="flex justify-center items-center w-[60dvw] max-md:w-[85dvw] h-24 rounded-xl shadow-xl ">
              <div className="p-4">
                <div className="w-16 h-16 rounded-full bg-slate-500 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/lego/7.jpg"
                    alt="3"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2>Ardi</h2>
              </div>
              <div className="w-full flex justify-end p-4">
                <p>#3</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="max-md:text-xs pb-48 flex flex-col justify-center h-full">
          <div className="max-md:w-[80dvw] w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Ranking</h2>
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
                        <div className="font-semibold text-center">Rank</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className="rounded-full"
                              src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                              width="40"
                              height="40"
                              alt="Alex Shatov"
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            Alex Shatov
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          <p>#1</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className="rounded-full"
                              src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                              width="40"
                              height="40"
                              alt="Philip Harbach"
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            Philip Harbach
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          <p>#2</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className="rounded-full"
                              src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                              width="40"
                              height="40"
                              alt="Mirko Fisuk"
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            Mirko Fisuk
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">
                          <p>#3</p>
                        </div>
                      </td>
                    </tr>
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
