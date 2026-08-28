"use client";

import { useState } from "react";
import { importTextDocument } from "@/app/actions/import";

export function ImportForm() {
  const [error, setError] = useState("");
  return <form action={importTextDocument} className="flex flex-wrap gap-2" onSubmit={(event) => { const file = new FormData(event.currentTarget).get("file"); if (!(file instanceof File) || !/\.txt$/i.test(file.name) || file.size > 1_048_576) { event.preventDefault(); setError("Choose a .txt file up to 1 MiB."); } }}><label className="theme-surface cursor-pointer rounded-lg border px-4 py-2 font-medium">Import .txt<input accept=".txt,text/plain" className="sr-only" name="file" type="file" /></label><button className="editor-button" type="submit">Import</button>{error && <p className="text-sm text-red-600" role="alert">{error}</p>}</form>;
}
