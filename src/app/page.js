import Articles from "@/templates/index/Articles";
import Promote from "@/templates/index/Promote";
import Navbar from "@/modules/navbar/Navbar";
import Banner from "@/templates/index/Banner";
import Categories from "@/templates/index/Categories";
import LatestProducts from "@/templates/index/LatestProducts";
import { roboto } from "@/utils/fonts";
import DownloadApp from "@/templates/index/DownloadApp";
import Footer from "@/modules/footer/Footer";
import { getCategories } from "@/utils/actions";

export default async function Home() {
  const categories = await getCategories();
  return (
    <main className={roboto.className}>
      <Navbar />
      <Banner />
      <Categories categories={categories} />
      <LatestProducts />
      <Promote />
      <Articles />
      <DownloadApp />
      <Footer />
    </main>
  );
}
