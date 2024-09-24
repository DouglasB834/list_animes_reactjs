import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";

import { Skeleton } from "./_components/skeleton";

interface Anime {
  id: string;
  attributes: {
    posterImage: {
      tiny: string;
    };
    titles: {
      en: string;
      en_jp: string;
      ja_jp: string;
    };
    slug: string;
    synopsis: string;
    createdAt: string;
    updatedAt: string;
    canonicalTitle: string;
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
type SortOrder = "createdAt" | "-createdAt";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("-createdAt");
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const itemsPerPage = 20; //lmite da api 20

  const fetchAnimeList = async (
    page: number,
    searchText?: string,
    sortOrder?: SortOrder
  ) => {
    const offset = (page - 1) * itemsPerPage;
    const url = searchText
      ? `anime?filter[text]=${searchText}&sort=${sortOrder}&page[limit]=${itemsPerPage}&page[offset]=${offset}`
      : `anime?sort=${sortOrder}&page[limit]=${itemsPerPage}&page[offset]=${offset}`;
    const response = await api.get(url);
    return response.data;
  };

  const {
    data: animesResponse,
    isLoading,
    error,
  } = useQuery<AnimeResponse>({
    queryKey: ["animeList", currentPage, searchText, sortOrder],
    queryFn: () => fetchAnimeList(currentPage, searchText, sortOrder),
  });

  const totalItems = animesResponse?.meta?.count ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setSearchText(form.search.value);
    setSearchParams("1");
    form.search.value = "";
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchParams("1");
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value as SortOrder);
    setSearchParams("1");
  };

  if (error) {
    return (
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-4 ">
        <p>Erro ao buscar animes.</p>
        <Link to="/">
          <Button
            aria-label="back home page"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Clique aqui para voltar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 space-y-5 ">
        <div className="flex flex-wrap gap-2 px-2 justify-between items-center border-b pb-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search for anime..."
              className="border rounded-sm p-2 w-44 sm:w-auto dark:text-primary-foreground"
            />
            <Button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
              Search
            </Button>
            {searchText && (
              <Button
                type="button"
                onClick={handleClearSearch}
                className="ml-2 p-2 bg-blue-500 text-white"
              >
                Clear
              </Button>
            )}
          </form>
          <Select onValueChange={handleSortChange} defaultValue={sortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Mais recentes primeiro</SelectItem>
              <SelectItem value="createdAt">Mais antigos primeiro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="hidden  sm:table-cell">
                Data de Criação
              </TableHead>
              <TableHead className="hidden  sm:table-cell">
                Data de Atualização
              </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading && <Skeleton />}
          <TableBody>
            {animesResponse?.data.map((anime: Anime) => (
              <TableRow key={anime?.id} className="group">
                <TableCell>
                  <Link
                    title="details"
                    to={`/details/${anime.id}`}
                    aria-label="link to page details anime "
                  >
                    <img
                      src={anime?.attributes.posterImage.tiny}
                      alt={
                        anime?.attributes.titles.en ||
                        anime?.attributes.titles.en_jp
                      }
                      sizes="100vw"
                      className="w-16 h-24 object-cover rounded-sm transition-transform ease-linear group-hover:scale-105 group-hover:animate-pulse"
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  {anime?.attributes?.titles.en ||
                    anime?.attributes.titles.en_jp ||
                    anime?.attributes.titles.ja_jp}
                </TableCell>
                <TableCell>
                  {anime?.attributes?.slug.split("-").join(" ")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatDate(anime?.attributes?.createdAt)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatDate(anime?.attributes?.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {animesResponse && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </>
  );
};
