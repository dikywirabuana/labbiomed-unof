import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryBody } from "@/components/story-body";
import { articles, findStory } from "@/lib/data/stories";

export const Route = createFileRoute("/artikel_/$slug")({ component: ArtikelDetail });

function ArtikelDetail() {
  const { slug } = Route.useParams();
  const story = findStory(articles, slug);
  if (!story) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-muted">Artikel tidak ditemukan.</p>
        <Link to="/artikel" className="mt-4 inline-block text-sm font-semibold text-red">
          Kembali ke artikel
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-red">Artikel</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{story.title}</h1>
      <p className="mt-2 text-sm text-muted">{story.date}</p>
      <StoryBody story={story} />
      <Link
        to="/reservasi"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk"
      >
        Reservasi tes ini
      </Link>
    </main>
  );
}
