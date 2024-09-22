import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

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
interface AnimeResponse {
  data: Anime[];
  links: {
    first: string;
    next: string;
    last: string;
  };
  meta: {
    count: number;
  };
}

export function App() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const itemsPerPage = 20;

  const fetchAnimeList = async (page: number) => {
    const offset = (page - 1) * itemsPerPage;
    const response = await api.get(
      `anime?page[limit]=${itemsPerPage}&page[offset]=${offset}`
    );
    return response.data;
  };

  const {
    data: animesResponse,
    isLoading,
    error,
  } = useQuery<AnimeResponse>({
    queryKey: ["animeList", currentPage],
    queryFn: () => fetchAnimeList(currentPage),
  });

  const totalItems = animesResponse?.meta?.count ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao buscar animes.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagem</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="hidden  sm:table-cell">
              Data de Atualização
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animesResponse?.data.map((anime: Anime) => (
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
              <TableCell className="hidden sm:table-cell">
                {formatDate(anime?.attributes?.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {animesResponse && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
