import React from "react";

interface ApodContentProps {
  data: {
    copyright?: string;
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: string;
    title: string;
    url: string;
  };
}

const ApodContent: React.FC<ApodContentProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {data.media_type === "image" ? (
        <img
          src={data.url}
          alt={data.title}
          className="w-full h-auto rounded-2xl object-contain border border-white/10 shadow-lg max-h-[40vh] md:max-h-96"
        />
      ) : (
        <div className="text-white/50">Media type not supported.</div>
      )}
      <div className="w-full space-y-2">
        <h3 className="text-xl font-bold text-white">{data.title}</h3>
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>{data.date}</span>
          {data.copyright && <span>&copy; {data.copyright}</span>}
        </div>
        <p className="text-sm text-white/80 mt-2">{data.explanation}</p>
      </div>
    </div>
  );
};

export default ApodContent;
