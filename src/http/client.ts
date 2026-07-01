import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const jar = new CookieJar();

export const http = wrapper(
    axios.create({
        baseURL: "https://publico.oefa.gob.pe",
        jar,
        withCredentials: true,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/149 Safari/537.36"
        }
    })
);