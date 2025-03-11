'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {tss} from 'tss-react';
import {useTheme} from "@/source/components/common/theme";
import Button from "@/source/components/common/button";
import image from '@/assets/images/backgrounds/custom.png';

const useStyles = tss.create(({theme}) => ({
    error: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0)",
        position: "absolute",
        top: 0,
        left: 0,

        "& .image": {
            height: "100%",
            minWidth: "100%",
            objectFit: "cover",
            objectPosition: "center",
            position: "fixed",
            top: 0
        }
    },
    overlay: {
        height: "100%",
        width: "100%",
        position: "absolute",
        inset: 0,
        opacity: 0.5,

        backgroundColor: theme.darkFont
    },
    content: {
        position: "absolute",
        padding: "20px",
        width: '80%',
        maxWidth: "600px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "20px",

        backgroundColor: theme.error,
        color: theme.onError
    },
    heading: {
        color: theme.onError
    },
    buttons: {
        alignSelf: "flex-end",
        display: "flex",
        alignItems: "center",
        gap: "20px",
    }
}));

export default function Error({error, reset}) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    const theme = useTheme();
    const {classes} = useStyles({theme});
    return (
        <main className={classes.error}>
            <figure className={classes.background}>
                <Image className='background-image' src={image} alt="Error background image" />
            </figure>
            <div className={classes.overlay} />
            <div className={classes.content}>
                <span className={classes.heading}>Oh no!</span>
                <span>{error.message}</span>
                <div className={classes.buttons}>
                    <Button role="error" style="text" onPress={() => reset()}>Retry</Button>
                    <Button role="error" style="filled" onPress={() => window.history.back()}>Go Back</Button>
                </div>
            </div>
        </main>
    );
}