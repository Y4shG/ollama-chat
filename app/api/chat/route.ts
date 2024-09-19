import { ModelFusionTextStream } from "@modelfusion/vercel-ai";
import { CoreMessage, StreamingTextResponse, streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export const runtime = "edge";

export async function POST(req: Request) {
  // useChat will send a JSON with a messages property:
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const ollama = createOllama({
    baseURL: process.env.OLLAMA_BASEURL,
  });

  const result = await streamText({
    messages,
    model: ollama("llama3.1"),
    system: `You are a helpful, respectful and honest assistant.`,
  });

  // Return the result using the Vercel AI SDK:
  return new StreamingTextResponse(
    // Convert the text stream to a Vercel AI SDK compatible stream:
    ModelFusionTextStream(
      result.textStream,
      // optional callbacks:
      {
        onStart() {
          console.log("onStart");
        },
        onToken(token) {
          console.log("onToken", token);
        },
        onCompletion: () => {
          console.log("onCompletion");
        },
        onFinal(completion) {
          console.log("onFinal", completion);
        },
      }
    )
  );
}
