import Side from "../components/sidebar";
import { RiTrophyLine, RiHistoryLine, RiUserLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Side>
        <>
          <div className="flex flex-col gap-2 items-center justify-center h-full pb-4">
            <div
              onClick={() => navigate("/kehadiran")}
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 max-md:rounded-lg max-md:w-[80dvw] max-md:items-center"
            >
              <span className="absolute top-10 z-0 h-20 w-20 max-md:h-10 max-md:w-10 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10] max-md:group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <div className="flex flex-row gap-2 w-full">
                  <span className="grid h-20 w-20 max-md:h-10 max-md:w-10 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <RiUserLine size={20} color="white" />
                  </span>
                  <h1 className="space-y-6 self-center text-lg max-md:text-sm leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    Kehadiran
                  </h1>
                </div>
                <div className="space-y-6 pt-5 text-base max-md:text-xs leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                    informasi tentang kehadiran untuk pelaksana anak magang di
                    Kota Bekasi.
                  </p>
                </div>
                <div className="pt-4 text-base max-md:text-xs font-semibold leading-7">
                  <p>
                    <a
                      href="#"
                      className="outline outline-2 outline-offset-2 rounded-lg p-1 text-sky-500 transition-all duration-300 group-hover:text-white"
                    >
                      Jelajahi &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/riwayat")}
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 max-md:rounded-lg max-md:w-[80dvw] max-md:items-center"
            >
              <span className="absolute top-10 z-0 h-20 w-20 max-md:h-10 max-md:w-10 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10] max-md:group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <div className="flex flex-row gap-2 w-full">
                  <span className="grid h-20 w-20 max-md:h-10 max-md:w-10 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <RiHistoryLine size={20} color="white" />
                  </span>
                  <h1 className="space-y-6 self-center text-lg max-md:text-sm leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    Riwayat
                  </h1>
                </div>
                <div className="space-y-6 pt-5 text-base max-md:text-xs leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                    informasi terkini mengenai catatan absensi untuk memantau
                    dan melacak riwayat partisipasi Anda dalam program magang.
                  </p>
                </div>
                <div className="pt-4 text-base max-md:text-xs font-semibold leading-7">
                  <p>
                    <a
                      href="#"
                      className="outline outline-2 outline-offset-2 rounded-lg p-1 text-sky-500 transition-all duration-300 group-hover:text-white"
                    >
                      Jelajahi &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/ranking")}
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 max-md:rounded-lg max-md:w-[80dvw] max-md:items-center"
            >
              <span className="absolute top-10 z-0 h-20 w-20 max-md:h-10 max-md:w-10 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10] max-md:group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <div className="flex flex-row gap-2 w-full">
                  <span className="grid h-20 w-20 max-md:h-10 max-md:w-10 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                    <RiTrophyLine size={20} color="white" />
                  </span>
                  <h1 className="space-y-6 self-center text-lg max-md:text-sm leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    Ranking
                  </h1>
                </div>
                <div className="space-y-6 pt-5 text-base max-md:text-xs leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                    informasi tentang peringkat atau ranking partisipasi
                    pelaksana anak magang di Kota Bekasi.
                  </p>
                </div>
                <div className="pt-4 text-base max-md:text-xs font-semibold leading-7">
                  <p>
                    <a
                      href="#"
                      className="outline outline-2 outline-offset-2 rounded-lg p-1 text-sky-500 transition-all duration-300 group-hover:text-white"
                    >
                      Jelajahi &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </Side>
    </>
  );
}
