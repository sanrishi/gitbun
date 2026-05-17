import { getLanguageProfile } from "./languageAnalyzer";

function detectFileScope(
  file: string
): string | null {
  const profile = getLanguageProfile(file);

  if (profile) {
    return profile.detectScope(file);
  }

  const parts = file.split("/");

  const srcIndex = parts.indexOf("src");

  if (
    srcIndex !== -1 &&
    parts[srcIndex + 1]
  ) {
    return parts[srcIndex + 1];
  }

  return null;
}

export function detectScope(
  filePaths: string[]
): string {
  const scopes: Record<string, number> = {};

  for (const file of filePaths) {
    const scope = detectFileScope(file);

    if (!scope) continue;

    scopes[scope] =
      (scopes[scope] || 0) + 1;
  }

  if (Object.keys(scopes).length === 0) {
    return "core";
  }

  return Object.entries(scopes).sort(
    (a, b) => b[1] - a[1]
  )[0][0];
}