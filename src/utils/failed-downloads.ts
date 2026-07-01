import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export interface FailedDownload {
    page: number;
    uuid: string;
    resolucion: string;
    reason: string;
}

const FILE = "output/failed-downloads.jsonl";

export async function saveFailedDownload(failed: FailedDownload): Promise<void> {
    await mkdir(dirname(FILE), {
        recursive: true,
    });

    await appendFile(FILE, JSON.stringify(failed) + "\n", "utf8");
}
