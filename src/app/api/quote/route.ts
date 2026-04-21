// app/api/quote/route.ts
export async function GET() {
  const response = await fetch('https://zenquotes.io/api/quotes/');
  const data = await response.json();
  return Response.json(data);
}
