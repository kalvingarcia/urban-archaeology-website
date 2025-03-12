"use client"
import {useContext, useState, useEffect} from 'react';
import {tss} from 'tss-react';
import {useTheme} from './common/theme';
import {QueryContext} from './listing-handler';
import Icon from "./common/iconography";

const useStyles = tss.create(({theme, hovered}) => ({
    search: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "1000px",
        height: "58px",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 2000px)",
        borderRadius: "2000px",
        paddingLeft: "30px",
        gap: "5px",
        backgroundColor: theme.surface,
        border: `1pt solid ${theme.body + "7F"}`,
        cursor: "text",
        pointerEvents: "none",

        "&:focus-within": {
            border: `1pt solid ${theme.secondary}`
        },

        "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: hovered? 0.1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: theme.body,
        }
    },
    textbox: {
        height: "100%",
        width: "100%",
        outline: "none",
        border: "none",
        backgroundColor: "transparent",
        color: theme.body,
        pointerEvents: "auto",

        "&::placeholder": {
            color: theme.body,
            opacity: 0.25
        }
    },
    divider: {
        width: "1pt",
        height: "60%",
        opacity: 0.5,
        backgroundColor: theme.body
    },
    button: {
        pointerEvents: "auto",
        zIndex: 1000
    }
}));

export default function Search() {
    const {getSearch, setSearch, applyRoute} = useContext(QueryContext);
    const value = getSearch();
    const [text, setText] = useState();
    useEffect(() => {
        setText(value?? "");
        setFilled(!value || value === ""? false : true);
    }, [value]);
    const [filled, setFilled] = useState(!value || value === ""? false : true);
    const handleFill = event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        setText(target.value);
        setSearch(target.value);
    };

    const [textField, setTextField] = useState(undefined);
    const handleContainerClick = event => {
        if(textField)
            textField.focus();
    };

    const [hovered, setHovered] = useState(false);

    const theme = useTheme();
    const {classes} = useStyles({theme, hovered});
    return (
        <div tabIndex={-1} className={classes.search} onClick={handleContainerClick}>
            <input 
                ref={setTextField}
                className={classes.textbox}
                name="search" value={text}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onChange={handleFill}
                placeholder='Search (e.g. Product ID, Name, Style, etc.)' 
            />
            <div className={classes.divider} />
            <Icon className={classes.button} role="primary" appearance="text" button icon="search" onClick={applyRoute} />
        </div>
    );
}