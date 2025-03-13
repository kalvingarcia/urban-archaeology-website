import {notFound, redirect} from 'next/navigation';
import ProducInfo from '@/source/components/product-info';
import Related from '@/source/components/related';
import Customs from '@/source/components/customs';
import Card from '@/source/components/card';
import {GET_PRODUCTS, GET_RELATED_PRODUCTS} from '@/app/api';

export async function generateMetadata({params}) {
    const {product: [id, extension, ..._]} = await params;
    const product = (await fetch(`${GET_PRODUCTS}/${id}`).then(response => {
        if(!response.ok) {
            extension = undefined;
            if(response.status === 404)
                return {name: "404 Not Found"};
            else
                return {name: "An error occured"};
        }
        return response.json();
    }));

    if(!extension)
        extension = "NONE";
    const variation = product.variations?.find(variation => variation.extension === extension);

    return {
        title: `Urban Archaeology | ${product.name}${variation.subname !== ""? ` [${variation.subname}]` : ""} Product Page`,
        description: product.description
    };
}

export default async function Product({params}) {
    const {product: [id, extension, ...rest]} = await params;
    if(rest.length > 0)
        redirect(`/catalog/${id}/${extension}`);
    if(!extension)
        extension = "NONE";

    let count = 0;
    const images = [];
    while(true) {
        const image = {
            name: `${count}.jpg`,
            alt: `Product image ${count}`,
            src: (await import(`@/assets/images/products/${id}/${extension}/${count}.jpg`).catch(() => undefined))?.default
        };
        if(image.src === undefined)
            break;
        images.push(image);
        count++;
    }
    const drawing = (await import(`@/assets/images/products/${id}/${extension}/drawing.jpg`).catch(() => undefined))?.default

    const product = (await fetch(`${GET_PRODUCTS}/${id}`, {cache: 'no-store'}).then(response => {
        if(!response.ok)
            if(response.status === 404) 
                return notFound();
            else 
                throw new Error("An error occured while attempting to get the product data.");
        return response.json()
    }));
    if(!product)
        throw new Error("An error occured while attempting to get the product data.");
    const related = await fetch(`${GET_RELATED_PRODUCTS}?id=${id}&extension=${extension}`, {cache: 'no-store'}).then(response => response.json());
    return (
        <main>
            <ProducInfo images={images} drawing={drawing} data={product} currentVariation={extension} />
            {related.length > 0 &&
                <Related>
                    {related.map(product => (
                        <Card 
                            key={`${product.id}${product.extension !== 'DEFAULT'? `-${product.extension}` : ""}}`}
                            type="small"
                            from='products'
                            id={product.id}
                            extension={product.extension}
                            name={product.name}
                            subname={product.subname}
                            category={product.category}
                        />
                    ))}
                </Related>
            }
            <Customs />
        </main>
    );
}