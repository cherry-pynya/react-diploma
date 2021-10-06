import Baner from "../Baner/Baner";
import Catalog from "../Catalog/Catalog";

export default function CatalogPage() {
    return(
        <main className="container">
            <div className="row">
                <div className="col">
                    <Baner />
                    <Catalog />
                </div>
            </div>
        </main>    
    );
}