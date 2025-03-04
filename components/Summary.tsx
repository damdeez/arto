interface SummaryProps {
  summary: string;
  loading?: boolean;
}

function Summary({ summary, loading }: SummaryProps) {
  return (
    <div className="max-w-90 w-100% p-4 mt-4 bg-slate-50 rounded-lg border-1 border-slate-200">
      {loading ? (
        "Loading status..."
      ) : (
        <>
          <h3 className="font-medium mb-2">The current Arto update:</h3>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
}

export default Summary;
