import raw from "./stories.json";

export type Story = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
  images?: string[];
  source?: string;
};

export const news = raw.news as Story[];
export const articles = raw.article as Story[];

export function findStory(list: Story[], slug: string) {
  return list.find((s) => s.slug === slug);
}

export function isHeading(line: string) {
  if (line.length > 72) return false;
  if (/^[•\-Ø]/.test(line)) return false;
  if (/[.:]$/.test(line) && line.length > 40) return false;
  return !line.includes(". ") && line.length < 60;
}

export function isBullet(line: string) {
  return /^([•\-–Ø]|[0-9]+\.)\s?/.test(line);
}
