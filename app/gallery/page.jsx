import Banner from "@/source/components/common/banner";
import {Display} from "@/source/components/common/typography";
import Construction from "@/source/components/construction";

export default async function Gallery({}) {
    return (
        <main>
            <Banner src="gallery.jpg">
                <Display size="medium">Gallery</Display>
            </Banner>
            <Construction title="Salvage Section Explained">
                The salvage section of the website would function simillarly
                to the catalog section.
            </Construction>
        </main>
    );
}