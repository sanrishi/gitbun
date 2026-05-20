import { cosmiconfig } from "cosmiconfig";

export interface GitbunConfig {
  customPrompt?: string;
}

export async function loadConfig(): Promise<GitbunConfig> {
  const explorer = cosmiconfig("smartcommit");
  const result = await explorer.search();

  return result?.config || {};
}
