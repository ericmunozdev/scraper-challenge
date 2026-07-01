import { downloadPdf } from "./downloader.js";
import { extractRows, parseDocuments } from "./parser.js";
import { getPage } from "./paginator.js";
import { getInitialPage } from "./search.js";

export class Scraper {

    public async run() {

        const result = await getInitialPage();

        let viewState = result.viewState;

        let documents = result.documents;

        const totalDocuments = result.totalDocuments;
        const pageSize = result.pageSize;

        console.log(`Total de documentos: ${totalDocuments}`);
        console.log(`Registros por página: ${pageSize}`);

        for (let first = 0; first < totalDocuments; first += pageSize) {

            const page = first / pageSize + 1;

            console.log(`\nPágina ${page}`);

            // Primera página
            if (first > 0) {

                const response = await getPage(
                    first,
                    pageSize,
                    viewState
                );

                viewState = response.viewState;

                const html = extractRows(response.xml);

                documents = parseDocuments(html);

            }

            console.log(
                `${documents.length} documentos encontrados`
            );

            for (const document of documents) {

                console.log(
                    `${document.numero} - ${document.resolucion}`
                );

                // await downloadPdf(
                //     document,
                //     viewState
                // );

            }

        }

    }

}