import { readFile } from "fs/promises";

export async function jsonToText(path: string): Promise<string> {
  try {
    // Read the JSON file
    const jsonData = await readFile(path, "utf-8");
    const parsedData = JSON.parse(jsonData);

    // Convert JSON to text
    let text = "";
    for (const item of parsedData) {
      text += `name: ${item.name}\n`;
      text += `description: ${item.description}\n`;
      text += `price: $${item.price}\n\n`;
    }

    return text;
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    throw error;
  }
}