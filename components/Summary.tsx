function Summary({ summary}: { summary: string | null }) {
  return (
    summary && (
      <div className="max-w-sm w-100% p-4 mt-8 bg-slate-50 rounded-lg border-1 border-slate-300">
        <h3 className="font-medium mb-2">The current Arto update:</h3>
        <p>{summary}</p>
      </div>
    )
  );
};

export default Summary;