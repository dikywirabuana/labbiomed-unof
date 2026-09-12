import { isBullet, isHeading, type Story } from "@/lib/data/stories";

export function StoryBody({ story }: { story: Story }) {
  return (
    <article className="mt-8">
      {story.images && story.images.length > 0 ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {story.images.map((src) => (
            <img
              key={src}
              src={src}
              alt={story.title}
              className={`w-full rounded-lg border border-line bg-surface object-contain ${
                story.images!.length === 1 ? "sm:col-span-2" : ""
              }`}
            />
          ))}
        </div>
      ) : null}
      <div className="space-y-4 text-base leading-relaxed text-ink">
        {story.body.map((line, i) => {
          if (isBullet(line)) {
            return (
              <p key={i} className="pl-4 text-muted">
                {line}
              </p>
            );
          }
          if (isHeading(line)) {
            return (
              <h2 key={i} className="pt-4 font-display text-2xl font-semibold">
                {line}
              </h2>
            );
          }
          return (
            <p key={i} className="text-muted">
              {line}
            </p>
          );
        })}
      </div>
      {story.source ? (
        <p className="mt-10 text-xs text-muted">
          Sumber: arsip resmi labbiomed.co.id. Edukasi umum, bukan pengganti nasihat dokter.
        </p>
      ) : null}
    </article>
  );
}
