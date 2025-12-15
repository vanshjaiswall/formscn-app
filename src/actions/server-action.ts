"use server";
import { google } from "googleapis";
import { actionClient } from "./safe-action";
import { formSchema } from "../lib/form-schema";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_HEADERS = [
  "product_name",
  "website",
  "description",
  "product_type",
  "what_are_you_selling",
  "product_demo",
  "product_delivery",
  "compliance_declaration",
  "merchant_agreement_policy",
  "social_media_links",
  "current_payment_solution",
  "socialmediabuttons-95d",
] as const;
const DEFAULT_RANGE = "Sheet1!A1";

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets configuration. Ensure GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID are set."
    );
  }

  const auth = new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
  const sheets = google.sheets({ version: "v4", auth });

  return { sheets, spreadsheetId };
}

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { sheets, spreadsheetId } = getSheetsClient();

      const row = SHEET_HEADERS.map((key) => {
        const value = (parsedInput as Record<string, unknown>)[key];
        if (Array.isArray(value)) return value.join(", ");
        if (typeof value === "boolean") return value ? "Yes" : "No";
        if (value === undefined || value === null) return "";
        return String(value);
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: process.env.GOOGLE_SHEET_RANGE || DEFAULT_RANGE,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [row],
        },
      });

      return {
        success: true,
        message: "Form submitted successfully",
      };
    } catch (error) {
      console.error("Failed to submit to Google Sheets", error);
      return {
        success: false,
        message: "Unable to submit form. Please try again.",
      };
    }
  });
