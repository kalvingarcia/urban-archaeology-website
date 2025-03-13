"use client"
import {tss} from 'tss-react';
import {useTheme} from './common/theme';
import {Heading} from "./common/typography";

const useStyles = tss.create(({theme, alone}) => ({
    related: {
        position: "relative",
        width: "100%",
        maxWidth: "1500px",
        margin: "auto",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",

        "&::before": {
            content: "''",
            position: "absolute",
            width: "100vw",
            height: "100%",
            top: 0,
            zIndex: 0,
            left: "calc(-1 * max(calc((100vw - 1500px) / 2), 0px))",
            backgroundColor: alone? "transparent" : theme.surface
        }
    },
    cards: {
        width: "100%",
        alignSelf: "center",
        display: "flex",
        overflowX: "auto",
        gap: "10px",

        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none"
        },
        "& *": {
            flex: "0 0 auto"
        }
    }
}));

export default function Related({alone = false, children}) {
    const theme = useTheme();
    const {classes} = useStyles({theme, alone});
    return (
        <section className={classes.related}>
            <Heading>Related Products</Heading>
            <div className={classes.cards}>
                {children}
            </div>
        </section>
    );
}