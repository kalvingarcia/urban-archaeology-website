import {Heading} from "./common/typography";

export default function Related({alone = false, children}) {
    return (
        <section className={["related", alone? "alone" : ""].join(" ")}>
            <Heading>Related Products</Heading>
            <div className="cards">
                {children}
            </div>
        </section>
    );
}