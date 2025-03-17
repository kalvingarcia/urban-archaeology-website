import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {keyframes, tss} from "tss-react";
import {useTheme} from "./theme";
import Icon from "./iconography";

const SNACKBAR_TIMEOUT = 5000;
const ANIMATION_TIME = 200;

const fadeInUp = keyframes`
    0% {
        transform: translate(0, 50px);
        opacity: 0;
    }
    100% {
        transform: translate(0, 0);
        opacity: 1;
    }
`;

const fadeOutDown = keyframes`
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(0, 50px);
        opacity: 0;
    }
`

const useStyles = tss.create(({theme, role}) => ({
    snackbar: {
        position: "fixed",
        bottom: "25px",
        left: "calc((100% - min(80%, 400px)) / 2)",
        width: "80%",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 20px",
        borderRadius: "20px",
        zIndex: 1000,

        backgroundColor: role === "primary"? theme.primary : theme.error,
        color: role === "primary"? theme.onPrimary : theme.onError,
        border: `1pt solid ${role === "primary"? theme.primary : theme.onError}`,
        boxShadow: `0px 8px 16px 0px ${theme.darkFont + "7F"}`,
    },
    enter: {
        animation: `${fadeInUp} 200ms ease-in forwards`
    },
    leave: {
        animation: `${fadeOutDown} 200ms ease-in forwards`
    }
}));

export default function Snackbar({role = "primary", open, setOpen, message, action}) {
    const [state, setState] = useState("inactive");
    useEffect(() => {
        setState("inactive");
        if(open) {
            setState("enter");
            setTimeout(() => setOpen(false), SNACKBAR_TIMEOUT);
            setTimeout(() => {
                setState("active");
                setTimeout(() => setState("leave"), SNACKBAR_TIMEOUT - ANIMATION_TIME * 2);
            }, ANIMATION_TIME);
        }
    }, [open]);

    const theme = useTheme();
    const {cx, classes} = useStyles({theme, role});
    return (open &&
        createPortal(
            <div className={cx(classes.snackbar, classes[state]?? "")}>
                <span>{message}</span>
                <Icon role={role} appearance="text" button onClick={() => action.callback()} icon={action.icon} />
            </div>,
            document.getElementById("theme-root")
        )
    );
}