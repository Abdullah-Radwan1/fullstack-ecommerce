import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const { name, lang } = await req.json();
  const user = getServerSession();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.openrouter}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://fullstack-ecommerce-flax.vercel.app/", // Optional
      "X-Title": "Vogue Haven", // Optional
    },
    body: JSON.stringify({
      model: "qwen/qwen3-coder:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate a product description for ${name}  in less than 25 words in ${lang} with enhanced grammer and spelling. Make it sound more appealing and engaging. Also, include a call to action at the end of the description.`,
            },
          ],
        },
      ],
    }),
  });

  const data = await res.json();

  const description =
    data.choices?.[0]?.message?.content ?? "No description found.";

  return new Response(JSON.stringify({ description }), {
    headers: { "Content-Type": "application/json" },
  });
}
