import React from "react";
import { useApodQuery } from "../../services/nasa";
import { Loader } from "../../common/components/loader";
import { Error } from "../../common/components/error";
import ApodContent from "./ApodContent";
import { AnimatePresence, motion } from 'framer-motion';

interface ApodModalProps {
  open: boolean;
  onClose: () => void;
  date: string;
  setDate: (date: string) => void;
}

const ApodModal: React.FC<ApodModalProps> = ({
  open,
  onClose,
  date,
  setDate,
}) => {
  const { data, isLoading, isError, error } = useApodQuery({ date });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="neo-module"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 z-60 flex items-center justify-center p-6 md:p-16 lg:p-24"
        >
          <div className="w-full h-full max-w-3xl bg-[#080808]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight italic mb-2">
                  Astronomy Picture of the Day
                </h2>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
                  APOD // NASA
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs font-mono focus:ring-1 ring-blue-500 outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex flex-col items-center gap-y-6">
                
              {isLoading && <Loader />}
              {isError && (
                <Error message={error?.message || "Failed to load APOD."} />
              )}
              {!isLoading && !isError && data && <ApodContent data={data} />}
              {!isLoading && !isError && !data && (
                <div className="text-center text-white/40">
                  No APOD data found for this date.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApodModal;
