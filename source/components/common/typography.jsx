import {tss} from "tss-react";
import {useTheme} from "./theme";

const displayStyles = tss.create(({size}) => ({
    display: {
        display: "block",
        position: "relative",
        fontSize: size === "small"? "1.75rem" : size === "medium"? "3rem" : "4.5rem",

        "@media (max-width: 700px)": {
            fontSize: size === "small"? "1rem" : size === "medium"? "1.5rem" : "2rem"
        }
    }
}));
export function Display({size = "large", style, children}) {
    const {classes} = displayStyles({size});
    return (
        <h1 className={classes.display} style={style}>{children}</h1>
    );
}

const hStyles = tss.create(({theme, type}) => ({
    h: {
        display: "block",
        position: "relative",
        color: theme[type],
        fontSize: type === "title"? "2rem" : type === "subtitle"? "1.75rem" : type === "heading"? "1.5rem" : "1.2rem",
        fontWeight: bold
    }
}));

export function Title({children}) {
    const theme = useTheme();
    const {classes} = hStyles({theme, type: "title"});
    return (
        <h1 className={classes.h}>{children}</h1>
    );
}
export function Subtitle({children}) {
    const theme = useTheme();
    const {classes} = hStyles({theme, type: "subtitle"});
    return (
        <h2 className={classes.h}>{children}</h2>
    );
}
export function Heading({children}) {
    const theme = useTheme();
    const {classes} = hStyles({theme, type: "heading"});
    return (
        <h3 className={classes.h}>{children}</h3>
    );
}
export function Subheading({children}) {
    const theme = useTheme();
    const {classes} = hStyles({theme, type: "subheading"});
    return (
        <h4 className={classes.h}>{children}</h4>
    );
}