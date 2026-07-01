import axios from "axios";

async function main() {
    console.log("Scraper iniciado");

    const response = await axios.get(
        "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml"
    );

    console.log(response.status);
}

main().catch(console.error);