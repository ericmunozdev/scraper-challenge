import { exportJson } from "../utils/exporter.js";
import { saveFailedDownload } from "../utils/failed-downloads.js";
import { Logger } from "../utils/logger.js";
import { downloadPdf } from "./downloader.js";
import { getPage } from "./paginator.js";
import { extractRows, parseDocuments } from "./parser.js";
import { delay, retry } from "./retry.js";
import { getInitialPage } from "./search.js";

export class Scraper {
    public async run() {
        const result = await getInitialPage();

        let viewState = result.viewState;

        let documents = result.documents;

        // Todos los documentos encontrados durante la ejecución
        const allDocuments = [...documents];

        const totalDocuments = result.totalDocuments;
        const pageSize = result.pageSize;

        Logger.info(`Total de documentos: ${totalDocuments}`);
        Logger.info(`Registros por página: ${pageSize}`);

        let downloaded = 0;

        const totalPages = Math.ceil(totalDocuments / pageSize);

        for (let first = 0; first < totalDocuments; first += pageSize) {
            const page = first / pageSize + 1;

            const percent = ((page / totalPages) * 100).toFixed(1);

            Logger.info(`Página ${page}/${totalPages} (${percent}%)`);

            // Primera página
            if (first > 0) {
                const response = await retry(() => getPage(first, pageSize, viewState));

                viewState = response.viewState;

                const html = extractRows(response.xml);

                documents = parseDocuments(html);

                allDocuments.push(...documents);

                await exportJson("documents.json", allDocuments);
            }

            Logger.info(`${documents.length} documentos encontrados`);

            for (const document of documents) {
                downloaded++;

                Logger.info(`Documento ${downloaded}/${totalDocuments}`);

                Logger.info(`${document.numero} - ${document.resolucion}`);

                try {
                    await retry(() => downloadPdf(document, viewState));
                } catch (error) {
                    await saveFailedDownload({
                        page,

                        uuid: document.uuid,

                        resolucion: document.resolucion,

                        reason: error instanceof Error ? error.message : String(error),
                    });

                    Logger.warning(`No fue posible descargar ${document.resolucion}`);
                }

                await delay(300);
            }

            await delay(500);

            // await exportJson("documents.json", allDocuments);

            Logger.success("Archivo documents.json generado correctamente.");
        }
    }
}
