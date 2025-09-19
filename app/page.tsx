import { PrismaClient } from "./generated/prisma"; // adjust path if needed
const db = new PrismaClient();

export default async function Home() {
  // Fetch some products
  const products = await db.affiliateProduct.findMany({
    take: 10, // limit to 10 for now
    orderBy: { id: "desc" }, // newest first
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Affiliate Products</h1>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.product_name}</h2>
            <p>{p.description}</p>
            <p className="text-gray-600">{p.display_price}</p>
            {p.merchant_image_url && (
              <img
                src={p.merchant_image_url}
                alt={p.product_name ?? "Product"}
                className="w-40 mt-2"
              />
            )}
            <a
              href={p.merchant_deep_link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mt-2"
            >
              View product
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
