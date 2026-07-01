import { getInitialPage } from "./scraper/search.js";
import { downloadPdf } from "./scraper/downloader.js";

// NUEVOS IMPORTS
import { getPage } from "./scraper/paginator.js";
import { extractRows, parseDocuments } from "./scraper/parser.js";

async function main() {

    // Obtiene la primera página
    const result = await getInitialPage();

    console.log("Primer documento:");
    console.log(result.documents[0]);

    // Descarga el primer PDF
    await downloadPdf(
        result.documents[0],
        result.viewState
    );

    // ===== NUEVO =====

    console.log("\nObteniendo página 2...\n");

    const page2 = await getPage(
        10,
        result.viewState
    );

    const html = extractRows(page2.xml);

    const documents = parseDocuments(html);

    console.log(documents);

}

main().catch(console.error);