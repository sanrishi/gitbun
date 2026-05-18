import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Get the content of a file as it exists in the git staging area.
 * @param filePath path relative to repository root
 * @returns file content as string, or null if the file is new (no staged version)
 */
export async function getStagedFileContent(filePath: string): Promise<string | null> {
  try {
    const { stdout } = await execAsync(`git show :${filePath}`);
    return stdout;
  } catch (error: unknown) {
    // If the file is untracked or new, git show fails.
    // Return null to indicate no old version.
    if ((error as { message?: string }).message?.includes('bad revision') || (error as { message?: string }).message?.includes('does not exist')) {
      return null;
    }
    throw error;
  }
}

/**
 * Get the current working tree content of a file.
 */
export async function getWorkingFileContent(filePath: string): Promise<string | null> {
  try {
    const { stdout } = await execAsync(`cat "${filePath}"`);
    return stdout;
  } catch {
    return null; // file might be deleted
  }
}