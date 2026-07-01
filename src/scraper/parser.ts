import * as cheerio from "cheerio";

export function extractTable(xml: string) {

    const match = xml.match(
        /<update id="listarDetalleInfraccionRAAForm:pgLista"><!\[CDATA\[(.*?)\]\]><\/update>/s
    );

    if (!match)
        throw new Error("No se encontró la tabla.");

    return match[1];

}

export function parseDocuments(html: string) {

    const $ = cheerio.load(html);

    const documents: any[] = [];

    $("#listarDetalleInfraccionRAAForm\\:dt_data tr").each((index, tr) => {

        const tds = $(tr).find("td");

        const onclick = $(tds[6])
            .find("a")
            .attr("onclick") ?? "";

        const uuidMatch = onclick.match(
            /param_uuid':'([^']+)'/
        );

        documents.push({

            rowIndex: Number($(tr).attr("data-ri")),

            numero: $(tds[0]).text().trim(),

            expediente: $(tds[1]).text().trim(),

            administrado: $(tds[2]).text().trim(),

            unidad: $(tds[3]).text().trim(),

            sector: $(tds[4]).text().trim(),

            resolucion: $(tds[5]).text().trim(),

            uuid: uuidMatch?.[1] ?? ""

        });

    });

    return documents;

}

export function extractRows(xml: string) {

    const match = xml.match(
        /<update id="listarDetalleInfraccionRAAForm:dt"><!\[CDATA\[(.*?)\]\]><\/update>/s
    );

    if (!match)
        throw new Error("No se encontraron filas.");

    return `
        <table>
            <tbody id="listarDetalleInfraccionRAAForm:dt_data">
                ${match[1]}
            </tbody>
        </table>
    `;

}

export function extractViewState(xml: string): string {

    const match = xml.match(
        /<update id="j_id1:javax\.faces\.ViewState:0"><!\[CDATA\[(.*?)\]\]><\/update>/s
    );

    if (!match)
        throw new Error("No se encontró el nuevo ViewState.");

    return match[1].trim();

}