import { Scraper } from "./scraper/scraper.js";

async function main() {
    const scraper = new Scraper();

    await scraper.run();
}

main().catch(console.error);
