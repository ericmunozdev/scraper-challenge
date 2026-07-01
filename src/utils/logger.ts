export class Logger {
    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static success(message: string) {
        console.log(`[OK] ${message}`);
    }

    static warning(message: string) {
        console.warn(`[WARN] ${message}`);
    }

    static error(message: string) {
        console.error(`[ERROR] ${message}`);
    }
}
