import ollama from "ollama";
import { ChromaClient } from "chromadb";
import { jsonToText } from "./utils";
import { getConfig } from "../config/config";
import { chunkTextBySentences } from "matts-llm-tools";

const chroma = new ChromaClient({ path: "http://localhost:8000" });

(async () => {
  await chroma.deleteCollection({ name: "ecommerceragchatbot" });

  const collection = await chroma.getOrCreateCollection({
    name: "ecommerceragchatbot",
    metadata: { "hnsw:space": "cosine" },
  });

  const { embedmodel } = getConfig();

  console.log("\nReading products from products.json\n");
  const textData = await jsonToText("products.json");

  console.log("Textdata: ", textData);

  const chunks = chunkTextBySentences(textData, 7, 0);

  for (const [index, chunk] of chunks.entries()) {
    const embed = (
      await ollama.embeddings({ model: embedmodel, prompt: chunk })
    ).embedding;

    await collection.add({
      ids: [`chunk-${index}`],
      embeddings: [embed],
      metadatas: [{ source: "products.json" }],
      documents: [chunk],
    });

    process.stdout.write(".");
  }

  console.log("\nEmbedding complete.");
})();
