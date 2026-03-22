import ProductsClient from "./ProductClient";
import { getProducts } from "@/lib/functions/product/getProducts";

// Define the search params interface
interface SearchParams {
  page?: string;
  category?: string;
  search?: string;
  min?: string;
  max?: string;
}

// Type assertion for default values
export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Await searchParams or use empty object
  const resolvedSearchParams = (await searchParams) ?? {};

  // Extract with defaults
  const {
    page = "1",
    category = "all",
    search = "",
    min = "0",
    max = "1300",
  } = resolvedSearchParams as SearchParams; // Type assertion here

  const { products, hasMore } = await getProducts({
    page: Number(page),
    category,
    search,
    min,
    max,
  });
  return (
    <ProductsClient
      initialProducts={products}
      hasMore={hasMore}
      initialSearch={search}
      initialCategory={category}
      initialPrice={[Number(min), Number(max)]}
      initialPage={Number(page)}
    />
  );
}
