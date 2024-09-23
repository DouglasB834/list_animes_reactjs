import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import imgNotFound from "@/assets/notFound.jpg";

import "@/global.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-xl text-gray-600 mb-8">Você deve estar perdido!</p>
        <img
          src={imgNotFound || ""}
          alt="Pessoa perdida, page not Found"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />
        <Link to="/">
          <Button
            aria-label="back home page"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Clique aqui para voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}
