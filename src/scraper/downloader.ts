import { access, writeFile } from "node:fs/promises";
import { http } from "../http/client.js";
import { Document } from "../models/document.js";
import { Logger } from "../utils/logger.js";

/**
 * Descarga el PDF asociado a un documento.
 */
export async function downloadPdf(document: Document, viewState: string) {
    const params = new URLSearchParams();

    params.append("listarDetalleInfraccionRAAForm", "listarDetalleInfraccionRAAForm");

    params.append("listarDetalleInfraccionRAAForm:txtNroexp", "");

    params.append("listarDetalleInfraccionRAAForm:dt_scrollState", "0,0");

    params.append("javax.faces.ViewState", viewState);

    params.append(
        `listarDetalleInfraccionRAAForm:dt:${document.rowIndex}:j_idt63`,
        `listarDetalleInfraccionRAAForm:dt:${document.rowIndex}:j_idt63`
    );

    params.append("param_uuid", document.uuid);

    const response = await http.post("/repdig/consulta/consultaTfa.xhtml", params, {
        responseType: "arraybuffer",
    });

    const filename = document.resolucion.replace(/[\\/:*?"<>|]/g, "_") + ".pdf";

    const path = `downloads/${filename}`;

    try {
        await access(path);

        Logger.success(`Ya existe ${filename}`);

        return;
    } catch {}

    await writeFile(path, response.data);

    Logger.info(`PDF descargado: ${filename}`);
}
