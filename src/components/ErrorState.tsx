interface ErrorStateProps {
  errorCode: string;
  emoji: string;
  title: string;
  quote: string;
}

export function ErrorState({ errorCode, emoji, title, quote }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full">
          <span className="text-4xl">{emoji}</span>
        </div>
        <div>
          <p className="text-sm font-mono bg-slate-900 text-green-400 px-4 py-2 rounded-lg inline-block">
            {errorCode}
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mb-2 mt-4">{title}</h3>
          <p className="text-slate-500 italic text-lg">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}
