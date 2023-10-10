import Link from "next/link";
import SiteHeader from "components/siteHeader";
import SearchFilters from "components/searchFilters";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader></SiteHeader>
      <SearchFilters></SearchFilters>
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <p>
          View <Link href="/">main page</Link>
        </p>
      </div>
    </div>
  );
}
