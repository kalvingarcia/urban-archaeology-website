"use client"
import {useRouter} from 'next/navigation';
import {tss} from "tss-react";
import {useTheme} from "./common/theme";
import Image from 'next/image';
import Spotlight from './spotlight';
import MetaData from "./meta-data";
import {Heading} from './common/typography';
import useRippleEffect from '../hooks/ripple';

const variationStyles = tss.create(({theme, active, rippleClass}) => ({
    variation: {
        flex: "0 0 auto",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "20px",
        borderRadius: "20px",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 20px)",
        position: "relative",
        backgroundColor: active? theme.secondary : theme.surface,
        color: active? theme.onSecondary : theme.body,
        border: active? `1pt solid ${theme.onSecondary + "7F"}}` : "none",
        pointerEvents: active? "none" : "auto",
        cursor: "pointer",

        "& .id": {
            fontSize: "0.8rem"
        },

        [`& .${rippleClass}`]: {
            backgroundColor: theme.body
        }
    }
}));
function Variation({active, id, extension, name, subname, price}) {
    const router = useRouter();
    const [rippleClass, rippleExpand, rippleFade] = useRippleEffect();

    const theme = useTheme();
    const {classes} = variationStyles({theme, active, rippleClass});
    return (
        <div 
            className={classes.variation}
            onMouseDown={event => !active && rippleExpand(event)}
            onMouseUp={event => !active && rippleFade(event)} 
            onClick={() => setTimeout(() => router.push(`/catalog/${id}/${extension}`), 100)}
        >
            <span>{name}{subname !== ""? ` [${subname}]` : ""}</span>
            <span className='id'>{id}{extension !== "NONE"? "-" + extension : ""}</span>
            <span>{price.toString() === "Infinity"? "Call for pricing" : `From $${price.toLocaleString('en', {useGrouping: true})}`}</span>
        </div>
    );
}

const variationListStyles = tss.create(({theme}) => ({
    variations: {
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    links: {
        width: "100%",
        display: "flex",
        gap: "10px",
        overflowX: "auto",

        "@media (max-width: 1000px)": {
            width: "100vw",
            alignSelf: "center",
            paddingLeft: "40px",
            paddingRight: "40px",
        },

        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    }
}));
function Variations({children}) {
    const theme = useTheme();
    const {classes} = variationListStyles({theme});
    return (
        <div className={classes.variations}>
            <Heading>Variations</Heading>
            <div className={classes.links}>
                {children}
            </div>
        </div>
    )
}

const productInfoStyles = tss.create(({theme}) => ({
    product: {
        maxWidth: "1500px",
        margin: "auto",
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "40px",
        padding: "120px 40px 40px 40px",

        "& > *": {
            flex: "1 0 auto",
            width: "50%"
        },

        "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",

            "& > *": {
                width: "100%"
            }
        }
    },
    data: {
        display: "flex",
        flexDirection: "column",
        gap: "40px"
    }
}));
export default function ProductInfo({images, drawing, data, currentVariation}) {
    const theme = useTheme();
    const {classes} = productInfoStyles({theme});
    return (
        <section className={classes.product}>
            <Spotlight>
                {images.map(image => (
                    <Image key={image.name} src={image.src} alt={image.alt} />
                ))}
            </Spotlight>
            <div className={classes.data}>
                <MetaData data={data} current={currentVariation} drawing={drawing} />
                {data.variations.length > 1 &&
                    <Variations>
                        {data.variations.map(variation => (
                            <Variation
                                key={variation.extension}
                                active={currentVariation === variation.extension}
                                id={data.id}
                                extension={variation.extension}
                                name={data.name}
                                subname={variation.subname}
                                price={variation.finishes.reduce((min, {value}) => min < value? min : value, Infinity)}
                            />
                        ))}
                    </Variations>
                }
            </div>
        </section>
    );
}