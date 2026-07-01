import { PROJECT_TITLE_FA } from "./projectTitles.fa";

export function translateProjectTitle(title: string) {
  return PROJECT_TITLE_FA[title] ?? title;
}
