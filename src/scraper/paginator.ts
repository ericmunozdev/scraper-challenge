import { writeFile } from "node:fs/promises";
import { http } from "../http/client.js";
import { extractViewState } from "./parser.js";

export async function getPage(first: number, pageSize: number, viewState: string) {
    const params = new URLSearchParams();

    params.append("javax.faces.partial.ajax", "true");
    params.append("javax.faces.source", "listarDetalleInfraccionRAAForm:dt");

    params.append("javax.faces.partial.execute", "listarDetalleInfraccionRAAForm:dt");

    params.append("javax.faces.partial.render", "listarDetalleInfraccionRAAForm:dt");

    params.append("listarDetalleInfraccionRAAForm:dt", "listarDetalleInfraccionRAAForm:dt");

    params.append("listarDetalleInfraccionRAAForm:dt_pagination", "true");

    params.append("listarDetalleInfraccionRAAForm:dt_first", first.toString());

    params.append("listarDetalleInfraccionRAAForm:dt_rows", pageSize.toString());

    params.append("listarDetalleInfraccionRAAForm:dt_skipChildren", "true");

    params.append("listarDetalleInfraccionRAAForm:dt_encodeFeature", "true");

    params.append("listarDetalleInfraccionRAAForm", "listarDetalleInfraccionRAAForm");

    params.append("listarDetalleInfraccionRAAForm:txtNroexp", "");

    params.append("listarDetalleInfraccionRAAForm:dt_scrollState", "0,0");

    params.append("javax.faces.ViewState", viewState);

    const response = await http.post("/repdig/consulta/consultaTfa.xhtml", params, {
        headers: {
            "Faces-Request": "partial/ajax",
        },
    });

    if (!response.data.includes("javax.faces.ViewState")) {
        await writeFile("debug-page52.xml", response.data);

        throw new Error("La respuesta no contiene ViewState. Se guardó debug-page52.xml");
    }

    return {
        xml: response.data,
        viewState: extractViewState(response.data),
    };
}
