import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  // RiCheckLine,
  // RiErrorWarningLine,
  RiEyeCloseFill,
  RiEyeFill,
  RiLoaderLine,
} from "@remixicon/react";
import Side from "../components/sidebar";
import { Navigate } from "react-router-dom";

export default function Login() {
  // const navigate = useNavigate();
  const [formDataInput, setFormDataInput] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", formDataInput.username);
    formData.append("password", formDataInput.password);
    // Send form data to the server
    axios
      .post("http://localhost:8080/token/", formData)
      .then((response) => {
        // console.log(response.data);
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        console.log(token);
        setIsAuth(true);
        // Handle successful login response
      })
      .catch((error) => {
        setIsAuth(false);
        console.error("Error logging in:", error);
      })
      .finally(() => {
        setIsLoading(false);
        // navigate("/tambahwajah");
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update form data when input values change
    const { name, value } = e.target;
    setFormDataInput({ ...formDataInput, [name]: value });
  };
  return !isAuth ? (
    <>
      <Side>
        <div className="w-dvh h-dvh flex items-center justify-center">
          <div className="mb-12 mr-4 max-md:p-4 flex gap-8 p-12 bg-gray-50 shadow-xl rounded-xl">
            {/* Container 1 */}
            <div className="max-md:hidden w-80 rounded-xl p-4 text-white flex flex-col justify-between bg-gradient-to-br from-cyan-200 via-cyan-500 to-cyan-200">
              <div className="pt-4 text-lg text-center">
                <h1>Absensi Peserta Magang</h1>
                <h2>DPRD Kota Bekasi</h2>
              </div>
              <img src="login3d.webp" alt="" />
            </div>
            {/* Container 2 */}
            <div className="w-[20dvw] max-md:w-[80dvw] h-full">
              <div className="flex items-center justify-center gap-2">
                <img src="dprd.webp" alt="" className="w-16 h-16" />
                <h1 className="text-lg">DPRD Kota Bekasi</h1>
              </div>

              <div className="text-center pt-6">
                <p className="text-lg">Selamat Datang</p>
                <p>Login Untuk Melihat Halaman</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 pt-4">
                  <input
                    name="username"
                    onChange={handleChange}
                    className="h-12 bg-slate-200 rounded-xl p-4"
                    type="username"
                    placeholder="username"
                    value={formDataInput.username}
                    id="username"
                  />
                  <div className="relative">
                    <input
                      name="password"
                      onChange={handleChange}
                      className="h-12 bg-slate-200 rounded-xl p-4 w-full"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={formDataInput.password}
                      id="password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <RiEyeCloseFill color="#B1B7B4" />
                      ) : (
                        <RiEyeFill color="#B1B7B4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-full pt-12 flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-4/5 h-12 rounded-xl ${
                      isLoading
                        ? "bg-gradient-to-br from-green-200 via-green-400 to-green-200"
                        : "bg-gradient-to-br from-cyan-200 via-cyan-400 to-cyan-200"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex w-full items-center justify-center p-3 gap-2">
                        <span className="text-base text-white">Loading</span>
                        <RiLoaderLine color="#ffff" size={28} />
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Side>
    </>
  ) : (
    <Navigate to="/tambahwajah" />
  );
}

{
  /* <div className="pt-12 w-full flex items-center justify-center">
            {response?.error && (
              <div className="w-full flex flex-col item-center justify-center text-base outline outline-red-500 outline-1 bg-red-100  px-4 py-2 rounded-md">
                <RiErrorWarningLine className="self-center" color="red" />
                <p className="text-center text-red-500">{response.error}</p>
              </div>
            )}
            {response?.response && (
              <div className="w-full flex flex-col item-center justify-center text-base outline outline-green-300 outline-1 bg-green-100 px-4 py-2 rounded-md">
                <RiCheckLine className="self-center" color="green" />
                <p className="text-center text-green-500">
                  {response.response}
                </p>
              </div>
            )}
          </div> */
}
