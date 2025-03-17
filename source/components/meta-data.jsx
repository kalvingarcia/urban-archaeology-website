"use client"
import Image from 'next/image';
import {useContext, useState} from 'react';
import {tss} from 'tss-react';
import {useTheme} from './common/theme';
import {Heading, Subheading, Subtitle, Title} from './common/typography';
import Button from './common/button';
import DropdownMenu from './common/dropdown-menu';
import Modal from './common/modal';
import Icon from './common/iconography';
import {MessageContext} from './common/message-handler';
import {GET_PRODUCT_CUTSHEET} from '@/app/api';

const useStyles = tss.create(({theme}) => ({
    metadata: {
        marginTop: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px"
    },
    general: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        "& .id": {
            opacity: 0.5
        }
    },
    title: {
        display: "flex",
        gap: "20px",
        alignItems: "baseline",

        "@media (max-width: 500px)": {
            flexDirection: "column",
            gap: "10px"
        }
    },
    price: {
        display: "flex",
        gap: "10px",
        alignItems: "center",

        "& .current": {
            fontSize: "1.2rem",
        },
        "& .base": {
            fontSize: "1rem",
            opacity: 0.75
        }
    },
    buttons: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        minHeight: "58px"
    },
    finishes: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        overflow: "hidden",
        overflowY: "scroll"
    },
    overview: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        "& .text": {
            margin: 0,
            textWrap: "wrap",
            fontFamily: "inherit"
        }
    }
}));

export default function MetaData({data, current, drawing}) {
    const variation = data.variations.find(variation => variation.extension === current);
    const minOption = variation.finishes.reduce((min, {display, value}) => min.value < value? min : {display, value}, Infinity);
    const [price, updatePrice] = useState(minOption.value);
    
    const {triggerInfoMessage, triggerErrorMessage} = useContext(MessageContext);
    const openPDF = () => {
        triggerInfoMessage("Generating PDF!");
        (async () => {
            const uri = await fetch(
                `${GET_PRODUCT_CUTSHEET}?id=${data.id}&extension=${variation.extension}`,
                {cache: 'no-store'}
            ).then(response => {
                if(!response.ok)
                    throw new Error("Couldn't generate PDF.");
                return response.text()
            }).catch(error => triggerErrorMessage(error.message));

            if(uri) {
                var download = document.createElement('a');
                download.setAttribute('href', uri);
                download.setAttribute('download', 
                    `${data.name}${variation.subname !== ""? ` [${variation.subname}]` : ""} Cutsheet - ${(new Date()).toLocaleDateString(
                        undefined, {year: 'numeric', month: 'short', day: 'numeric'})}.pdf`
                );
                download.style.display = 'none';

                document.body.appendChild(download);
                download.click();
                document.body.removeChild(download);
                triggerInfoMessage("PDF download initiated!")
            }
        })();
    };

    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const {classes} = useStyles({theme});
    return (
        <div className={classes.metadata}>
            <div className={classes.general}>
                <div className={classes.title}>
                    <Title>{data.name}</Title>
                    {variation.subname !== ""? <Subtitle>{variation.subname}</Subtitle> : ""}
                </div>
                <span className='id'>{data.id}{current !== "NONE"? "-" + current : ""}</span>
                <div className={classes.price}>
                    <span className='current'>{price.toString() === "Infinity"? "Call for pricing" : `$${price.toLocaleString('en', {useGrouping: true})}.00`}</span>
                    {price !== minOption.value &&
                        <span className='base'>(Starting at ${minOption.value.toLocaleString('en', {useGrouping: true})})</span>
                    }
                </div>
                <p>{data.description}</p>
                <div className={classes.buttons}>
                    <Button role="primary" style="filled" onClick={() => setOpen(true)}>Product Details</Button>
                    <Icon appearance="text" button icon="picture_as_pdf" onClick={() => openPDF()} />
                </div>
            </div>
            {variation.finishes.length > 1 &&
                <div className={classes.finishes}>
                    <Heading>Finishes</Heading>
                    <DropdownMenu options={variation.finishes} defaultOption={minOption} onChange={updatePrice} />
                </div>
            }
            <Modal open={open} setOpen={setOpen}>
                <div className={classes.container}>
                    <div>
                        <Heading>Drawing</Heading>
                        <Image src={drawing} alt="" />
                    </div>
                    <div className={classes.overview}>
                        <Heading>Overview</Heading>
                        {variation.overview.specifications &&
                            <div className={classes.content}>
                                <Subheading>Specifications</Subheading>
                                {variation.overview.specifications.width && <span>Width: {variation.overview.specifications.width.measurement} {variation.overview.specifications.width.unit}</span>}
                                {variation.overview.specifications.projection && <span>Projection: {variation.overview.specifications.projection.measurement} {variation.overview.specifications.projection.unit}</span>}
                                {variation.overview.specifications.height && <span>Height: {variation.overview.specifications.height.measurement} {variation.overview.specifications.height.unit}</span>}
                                {variation.overview.specifications.weight && <span>Weight: {variation.overview.specifications.weight.measurement} {variation.overview.specifications.weight.unit}</span>}
                            </div>
                        }
                        {variation.overview.ul &&
                            <div className={classes.content}>
                                <Subheading>UL Listing</Subheading>
                                <span>This product is listed for use in {variation.overview.ul.toUpperCase()} environments.</span>
                            </div>
                        }
                        {variation.overview.bulbs?.length > 0 &&
                            <div className={classes.content}>
                                <Subheading>Bulb Options</Subheading>
                                {variation.overview.bulbs.map(bulb => <pre key={bulb.key} className='text'>{bulb.info}</pre>)}
                            </div>
                        }
                        {(variation.overview.notes?? "" !== "") &&
                            <div className={classes.content}>
                                <Subheading>Notes</Subheading>
                                <pre className='text'>{variation.overview.notes}</pre>
                            </div> 
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
}