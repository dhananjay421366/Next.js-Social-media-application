import { Resend } from "resend";
// console.log("API KEY:", process.env);
const RESEND_API_KEY = "re_edfY77kQ_P1aDGNDwtps1sYWuDFKpxiky"

export const resend = new Resend(RESEND_API_KEY);
