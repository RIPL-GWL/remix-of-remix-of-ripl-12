import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteHeader, SiteFooter } from "@/frontend/components/site-chrome";

type Lang = "en" | "hi";

export function BilingualLegal({ title, hiTitle, en, hi }: { title: string; hiTitle: string; en: string; hi?: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const body = lang === "hi" && hi ? hi : en;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-shell py-14 sm:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="royal-label">Legal</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">{lang === "hi" ? hiTitle : title}</h1>
          <div className="mt-6 inline-flex rounded-full border border-border p-1" role="tablist" aria-label="Language">
            {(["en", "hi"] as const).map((l) => (
              <button key={l} role="tab" aria-selected={lang === l} onClick={() => setLang(l)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {l === "en" ? "English" : "हिन्दी"}
              </button>
            ))}
          </div>
          {lang === "hi" && !hi && (
            <p className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">इस दस्तावेज़ का हिन्दी संस्करण जल्द उपलब्ध होगा। तब तक अंग्रेज़ी संस्करण मान्य है।</p>
          )}
          <div lang={lang === "hi" && hi ? "hi" : "en"} className="legal-body mt-8 space-y-5 leading-7 text-foreground/85 break-words [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:text-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_hr]:my-8 [&_hr]:border-border [&_strong]:text-foreground [&_table]:w-full [&_table]:text-sm [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
