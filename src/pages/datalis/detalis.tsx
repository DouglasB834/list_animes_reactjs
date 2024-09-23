import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

import { LoadingSkeleton } from "./_componets/skeleton";

interface AnimeDetails {
  id: string;
  attributes: {
    titles: {
      en: string;
      ja_jp: string;
    };
    synopsis: string;
    description: string;
    posterImage: {
      original: string;
    };
    averageRating: string;
    startDate: string;
    endDate: string;
    status: string;
    episodeCount: number;
    episodeLength: number;
    youtubeVideoId?: string;
  };
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className=" ">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full  h-full rounded-lg min-h-[300px]"
      />
    </div>
  );
}

export default function AnimeDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const fetchAnimeDetails = async (id?: string) => {
    const response = await api.get(`https://kitsu.io/api/edge/anime/${id}`);
    return response.data.data;
  };

  const {
    data: anime,
    isLoading,
    error,
  } = useQuery<AnimeDetails>({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeDetails(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Anime não encontrado</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Helmet title="Detalis" />
      <Link
        to={"/"}
        aria-label="Back home"
        className="mb-4 flex items-center hover:bg-gray-300 w-16 "
      >
        <ChevronLeft className="mr-2 h-4 w-6" /> Voltar
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{anime?.attributes?.titles?.en}</CardTitle>
          <CardDescription>{anime?.attributes?.titles?.ja_jp}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={anime?.attributes?.posterImage?.original}
                alt={anime?.attributes?.titles?.en}
                sizes="100vw"
                className="w-full h-auto object-cover rounded-lg max-w-md m-auto "
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Sinopse</h3>
                <p>{anime?.attributes?.synopsis}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Descrição</h3>
                <p>{anime?.attributes?.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Avaliação Média</h4>
                  <p>{anime?.attributes?.averageRating}%</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <p>{anime?.attributes?.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Número de Episódios</h4>
                  <p>{anime?.attributes?.episodeCount}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Duração do Episódio</h4>
                  <p>{anime?.attributes?.episodeLength} minutos</p>
                </div>
                <div>
                  <h4 className="font-semibold">Data de Início</h4>
                  <p>{anime?.attributes?.startDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Data de Término</h4>
                  <p>{anime?.attributes?.endDate || "Em andamento"}</p>
                </div>
              </div>
            </div>
          </div>
          {anime?.attributes?.youtubeVideoId && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Trailer</h3>
              <YouTubeEmbed videoId={anime?.attributes?.youtubeVideoId} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
