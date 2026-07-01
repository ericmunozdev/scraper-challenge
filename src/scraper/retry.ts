import axios from "axios";
import { Logger } from "../utils/logger.js";

export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function retry<T>(
    operation: () => Promise<T>,
    retries = 4,
    initialDelay = 1000
): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;

            if (axios.isAxiosError(error) && error.response?.status === 429) {
                if (attempt === retries) break;

                const wait = initialDelay * Math.pow(2, attempt - 1);

                Logger.warning(`429 detectado. Reintentando en ${wait} ms...`);

                await delay(wait);

                continue;
            }

            throw error;
        }
    }

    throw lastError;
}
