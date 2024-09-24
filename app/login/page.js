"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { VscLoading } from "react-icons/vsc";
import imgLogin from "../../public/assets/campaign.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import campanhasExemplo from "../../public/itensLists/campanhas";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      // Simulando o login
      localStorage.setItem("user-token", "istoéumtoken");
      localStorage.setItem('campanhas', JSON.stringify(campanhasExemplo));
      toast.success("Login realizado com sucesso!", {
        position: "bottom-right",
      });
      setLoading(false);
      router.push("/campanhas");
    }, 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      router.push("/campanhas");
    }
  }, []);

  const isFormValid = email && password;

  return (
    <div className="h-screen flex flex-col md:flex-row w-full">
      <div className="bg-green-300 overflow-hidden w-full h-1/2 md:h-full flex flex-col items-center justify-center p-4 md:p-16">
        <Image
          src={imgLogin}
          alt="Login Image"
          className="max-w-lg h-full pt-10 md:h-auto object-contain"
        />
        <h1 className="text-lg md:text-3xl font-extrabold text-green-700 text-center mb-6">
          Gerenciador de Campanhas
        </h1>
      </div>

      <div className="flex items-center justify-center bg-white h-full max-w-3xl w-full p-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">
            Login
          </h2>
          <form className="space-y-4 text-gray-700">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 h-9 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 h-9 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-6 right-0 p-2 h-9 flex items-center border rounded-e-md border-gray-200 bg-primary-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon className="w-4 h-4" />
                ) : (
                  <EyeClosedIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isFormValid || loading} // Desabilita o botão se não houver email e senha ou se estiver carregando
                className={`w-full py-2 flex items-center justify-center px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isFormValid && !loading
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
