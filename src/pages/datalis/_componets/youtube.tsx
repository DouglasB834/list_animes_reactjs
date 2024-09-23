export const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
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
};
