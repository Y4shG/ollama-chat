import { ModelFusionTextStream } from "@modelfusion/vercel-ai";
import { CoreMessage, streamText } from "ai";
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
    model: ollama("llama3.2:1b"),
    system: `You are a helpful, respectful and honest assistant.`,
  });

  // Return the result using the Vercel AI SDK:
  // Convert the text stream to a Vercel AI SDK compatible stream:
  const response = new Response(
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
    ),
    {
      status: 200,
    }
  );
  response.headers.set("Content-Type", "text/plain; charset=utf-8");

  return response;
}
