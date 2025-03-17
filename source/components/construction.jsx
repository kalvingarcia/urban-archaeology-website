"use client"
import {tss} from 'tss-react';
import {useTheme} from './common/theme';
import {Title} from './common/typography';
import Button from './common/button';

const useStyles = tss.create(({theme}) => ({
    construction: {
        padding: "40px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    divider: {
        height: "1pt",
        width: "75%",
        backgroundColor: theme.body + "7F"
    }
}));

// https://forms.gle/c6KUMZ9wDvTvRyDKA
export default function Construction({title, children}) {
    const theme = useTheme();
    const {classes} = useStyles({theme});
    return (
        <div className={classes.construction}>
            <Title>{title}</Title>
            <div className={classes.divider} />
            <p>{children}</p>
            <Button onClick={() => setTimeout(() => window.location.href = "https://projects.kalvingarcia.com/?open=urbarch-website", 100)}>See Design Concepts</Button>
        </div>
    );
}

/*
Currently our website is in the beta stages, which means we're still in the process of adding
in-depth product information, our custom products, and other new website features! While
we complete this process, please feel free to give us insight on your experience and how
we can improve.
*/