import Banner from "@/source/components/common/banner";
import {Display} from "@/source/components/common/typography";
import ListingHandler from "@/source/components/listing-handler";
import Featured from "@/source/components/featured";
import Listings from "@/source/components/listings";
import Card from "@/source/components/card";
import {GET_FEATURED_PRODUCTS, GET_PRODUCTS, GET_PRODUCT_TAGS} from '../api';

export default async function Catalog({searchParams}) {
    const queryStringList = []
    for(const [parameter, value] of Object.entries(await searchParams))
        queryStringList.push(`${parameter}=${value.replace(/\|/g, "%7C")}`);
    const queryString = queryStringList.join("&");

    const filters = await fetch(`${GET_PRODUCT_TAGS}?from=products&${queryString}`, {cache: 'no-store'}).then(response => response.json());
    const featured = await fetch(`${GET_FEATURED_PRODUCTS}?${queryString}`, {cache: 'no-store'}).then(response => response.json());
    const listings = await fetch(`${GET_PRODUCTS}?${queryString}`, {cache: "no-store"}).then(response => response.json());
    return (
        <main>
            <Banner src="catalog.jpg">
                <Display size="medium">Catalog</Display>
            </Banner>
            <ListingHandler filters={filters}>
                {featured.length === 0? "" : <Featured featured={featured} changeWidth={1600} />}
                <Listings>
                    {listings.map(product => (
                        <Card
                            key={`${product.id}-${product.extension}`}
                            type="list"
                            from="products"
                            id={product.id}
                            extension={product.extension}
                            name={product.name}
                            subname={product.subname}
                            category={product.category}
                            price={product.price}
                        />
                    ))}
                </Listings>
            </ListingHandler>
        </main>
    )
}