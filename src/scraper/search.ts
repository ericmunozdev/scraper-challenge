import * as cheerio from "cheerio";
import { http } from "../http/client.js";
import {
    extractTable,
    parseDocuments,
    extractViewState,
    extractRowCount,
    extractPageSize
} from "./parser.js";

export async function getInitialPage() {

    // Página inicial
    const response = await http.get("/repdig/consulta/consultaTfa.xhtml");

    const html = response.data;

    const $ = cheerio.load(html);

    const viewState = $("input[name='javax.faces.ViewState']").val();

    if (!viewState)
        throw new Error("No se encontró el ViewState.");

    console.log("ViewState obtenido.");

    // Construimos el POST
    const params = new URLSearchParams();

    params.append("javax.faces.partial.ajax", "true");
    params.append("javax.faces.source", "listarDetalleInfraccionRAAForm:btnBuscar");
    params.append("javax.faces.partial.execute", "@all");
    params.append(
        "javax.faces.partial.render",
        "listarDetalleInfraccionRAAForm:pgLista listarDetalleInfraccionRAAForm:txtNroexp"
    );

    params.append(
        "listarDetalleInfraccionRAAForm:btnBuscar",
        "listarDetalleInfraccionRAAForm:btnBuscar"
    );

    params.append("listarDetalleInfraccionRAAForm", "listarDetalleInfraccionRAAForm");
    params.append("listarDetalleInfraccionRAAForm:txtNroexp", "");
    params.append("listarDetalleInfraccionRAAForm:dt_scrollState", "0,0");
    params.append("javax.faces.ViewState", viewState.toString());

    const searchResponse = await http.post(
        "/repdig/consulta/consultaTfa.xhtml",
        params,
        {
            headers: {
                "Faces-Request": "partial/ajax"
            }
        }
    );

    const tableHtml = extractTable(searchResponse.data);

    const totalDocuments = extractRowCount(tableHtml);

    const pageSize = extractPageSize(tableHtml);

    const newViewState = extractViewState(searchResponse.data);

    const documents = parseDocuments(tableHtml);

    for (const document of documents) {

        console.log(document);

    }

    return {
        documents,
        viewState: newViewState,
        totalDocuments,
        pageSize
    };
}