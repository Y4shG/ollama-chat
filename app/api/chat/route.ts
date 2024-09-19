import { asChatMessages, ModelFusionTextStream } from "@modelfusion/vercel-ai";
import { Message, StreamingTextResponse } from "ai";
import { ollama, streamText } from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  // useChat will send a JSON with a messages property:
  const { messages }: { messages: Message[] } = await req.json();

  const textStream = await streamText({
    model: ollama.ChatTextGenerator({ model: "llama3.1" }).withChatPrompt(),
    prompt: {
      system:
        "You are an AI chat bot. " +
        "Follow the user's instructions carefully.",

      // map Vercel AI SDK Message to ModelFusion ChatMessage:
      messages: asChatMessages(messages),
    },
  });

  // Return the result using the Vercel AI SDK:
  return new StreamingTextResponse(
    // Convert the text stream to a Vercel AI SDK compatible stream:
    ModelFusionTextStream(
      textStream,
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
