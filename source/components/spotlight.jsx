"use client"
import {useState, useEffect, cloneElement, useCallback, Children} from "react";
import {tss} from 'tss-react';
import {useTheme} from "./common/theme";

const stageStyles = tss.create(({theme, mini, lead}) => ({
    stage: {
        flex: mini? "0 0 auto" : "none",
        width: mini? "150px" : "100%",
        height: mini? "150px" : "auto",
        filter: mini && !lead? "grayscale(100%)" : "none",
        border: mini && lead? `1pt solid ${theme.onPrimary}` : "none",
        aspectRatio: 1,

        "& img": {
            height: "100%",
            minWidth: "100%",
            objectFit: "cover",
            objectPosition: "center",
        },

        "@media (max-width: 600px)": {
            width: mini? "100px" : "100%",
            height: mini? "100px" : "auto"
        }
    }
}));
function Stage({mini = false, lead = false, onClick, children}) {
    const handleClick = useCallback(() => {
        if(mini)
            onClick();
    }, [mini]);

    const theme = useTheme();
    const {classes} = stageStyles({theme, mini, lead});
    return (
        <figure className={classes.stage} onClick={handleClick}>
            {children}
        </figure>
    );
}

const spotlightStyles = tss.create(({theme}) => ({
    spotlight: {
        maxWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",

        "@media (max-width: 1100px)": {
            maxWidth: "none"
        }
    },
    backstage: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "fit-content",
        width: "100%",
        overflowX: "auto"
    }
}));
export default function Spotlight({children}) {
    const [activeStage, setActiveStage] = useState(0);
    const [stages, setStages] = useState(() => {
        const imageList = Children.toArray(children);
        return imageList.map((image, index) => (
            <Stage key={image.key} onClick={() => setActiveStage(index)}>{image}</Stage>
        ));
    });

    useEffect(() => {
        setStages(stages.map((stage, index) => (
            cloneElement(stage, {lead: activeStage === index})
        )));
    }, [activeStage]);

    const theme = useTheme();
    const {classes} = spotlightStyles({theme});
    return (
        <div className={classes.spotlight}>
            {stages[activeStage]}
            <div className={classes.backstage}>
                {stages.map(stage => (
                    cloneElement(stage, {mini: true})
                ))}
            </div>
        </div>
    )
}