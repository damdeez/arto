function Summary({ summary }: { summary: string | null }) {
  return (
    summary && (
      <div className="max-w-90 w-100% p-4 mt-4 bg-slate-50 rounded-lg border-1 border-slate-200">
        <h3 className="font-medium mb-2">The current Arto update:</h3>
        <p>{summary}</p>
      </div>
    )
  );
}

export default Summary;
