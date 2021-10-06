import CatalogItems from "./CatalogItems/CatalogItems";
import CatalogLoadMore from "./CatalogLoadMore/CatalogLoadMore";
import CatalogNav from "./CatalogNav/CatalogNav";
import CatalogSearch from "./CatalogSearch/CatalogSearch";

export default function Catalog() {
    return(
        <section className='catalog'>
            <h2 className='text-center'>Каталог</h2>
            <CatalogNav />
            <CatalogSearch />
            <CatalogItems />
            <CatalogLoadMore />
        </section>
    );
}