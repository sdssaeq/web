export default function Login() {
  return (
    <>
      <div className="w-dvh h-dvh flex items-center justify-center">
        <div className="max-md:p-4 flex gap-8 p-12 bg-gray-50 shadow-xl rounded-xl">
          {/* Container 1 w-[20dvw] h-[50dvh]*/}
          <div className="max-md:hidden w-80 rounded-xl p-4 text-white flex flex-col justify-between bg-gradient-to-br from-cyan-200 via-cyan-500 to-cyan-200">
            <div className="pt-4 text-xl text-center">
              <h1>Absensi Peserta Magang</h1>
              <h2>DPRD Kota Bekasi</h2>
            </div>
            <img src="login3d.webp" alt="" />
          </div>
          {/* Container 2 */}
          <div className="w-[20dvw] max-md:w-[80dvw] h-full">
            <div className="flex items-center justify-center gap-2">
              <img src="dprd.webp" alt="" className="w-16 h-16" />
              <h1 className="text-xl">DPRD Kota Bekasi</h1>
            </div>

            <div className="text-center pt-6">
              <p className="text-xl">Selamat Datang</p>
              <p>Login Untuk Melihat Halaman</p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <input
                className="h-12 bg-slate-200 rounded-xl p-4"
                type="email"
                placeholder="Email"
                name=""
                id=""
              />
              <input
                className="h-12 bg-slate-200 rounded-xl p-4"
                placeholder="Password"
                type="password"
                name=""
                id=""
              />
            </div>
            <div className="w-full pt-12 flex items-center justify-center">
              <button className="w-4/5 h-12 bg-gradient-to-br from-cyan-200 via-cyan-400 to-cyan-200 rounded-xl">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
