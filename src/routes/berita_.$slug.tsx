import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryBody } from "@/components/story-body";
import { findStory, news } from "@/lib/data/stories";

export const Route = createFileRoute("/berita_/$slug")({ component: BeritaDetail });

function BeritaDetail() {
  const { slug } = Route.useParams();
  const story = findStory(news, slug);
  if (!story) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-muted">Berita tidak ditemukan.</p>
        <Link to="/berita" className="mt-4 inline-block text-sm font-semibold text-red">
          Kembali ke berita
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-red">Berita</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{story.title}</h1>
      <p className="mt-2 text-sm text-muted">{story.date}</p>
      <StoryBody story={story} />
      <Link to="/berita" className="mt-10 inline-block text-sm font-semibold text-blue">
        Semua berita
      </Link>
    </main>
  );
}
