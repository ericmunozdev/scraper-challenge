import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function exportJson(filename: string, data: unknown): Promise<void> {
    const path = `output/${filename}`;

    await mkdir(dirname(path), {
        recursive: true,
    });

    await writeFile(path, JSON.stringify(data, null, 2), "utf8");
}
