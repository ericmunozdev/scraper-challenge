import { http } from "../http/client.js";
import { Document } from "../models/document.js";
import { writeFile } from "node:fs/promises";

export async function downloadPdf(
    document: Document,
    viewState: string
) {

    const params = new URLSearchParams();

    params.append(
        "listarDetalleInfraccionRAAForm",
        "listarDetalleInfraccionRAAForm"
    );

    params.append(
        "listarDetalleInfraccionRAAForm:txtNroexp",
        ""
    );

    params.append(
        "listarDetalleInfraccionRAAForm:dt_scrollState",
        "0,0"
    );

    params.append(
        "javax.faces.ViewState",
        viewState
    );

    params.append(
        `listarDetalleInfraccionRAAForm:dt:${document.rowIndex}:j_idt63`,
        `listarDetalleInfraccionRAAForm:dt:${document.rowIndex}:j_idt63`
    );

    params.append(
        "param_uuid",
        document.uuid
    );

    const response = await http.post(
        "/repdig/consulta/consultaTfa.xhtml",
        params,
        {
            responseType: "arraybuffer"
        }
    );

    const filename =
        document.resolucion.replace(/[\\/:*?"<>|]/g, "_") + ".pdf";

    await writeFile(
        `downloads/${filename}`,
        response.data
    );

    console.log(`PDF descargado: ${filename}`);

}