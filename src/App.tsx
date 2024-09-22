import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { api } from "./api/axios";
import { Pagination } from "./components/pagination";

import "./global.css";

interface Anime {
  id: string;
  attributes: {
    posterImage: {
      tiny: string;
    };
    titles: {
      en: string;
    };
    slug: string;
    synopsis: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function App() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const fetchAnimeList = async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await api.get(
        `https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&page[offset]=${offset}`
      );
      console.log(response.data);
      setAnimes(response.data.data);
      setTotalItems(response.data.meta.count);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.response ? error?.response?.data.errors[0] : error);
      console.error("Error fetching animes:", error);
    }
  };

  useEffect(() => {
    fetchAnimeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage); // para caso sobre alguma pagina arredondar para cima

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagem</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Data de Atualização</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animes.map((anime) => (
            <TableRow key={anime?.id}>
              <TableCell>
                <img
                  src={anime?.attributes.posterImage.tiny}
                  alt={anime?.attributes.titles.en}
                  className="w-16 h-24 object-cover"
                />
              </TableCell>
              <TableCell>{anime?.attributes?.titles.en}</TableCell>
              <TableCell>{anime?.attributes?.slug}</TableCell>
              <TableCell>{formatDate(anime?.attributes?.createdAt)}</TableCell>
              <TableCell>{formatDate(anime?.attributes?.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
