import {Title} from './common/typography';
import Button from './common/button';


// https://forms.gle/c6KUMZ9wDvTvRyDKA
export default function Construction({title, children}) {
    return (
        <div className="construction">
            <Title>{title}</Title>
            <div className="divider" />
            <p>{children}</p>
            <a href="https://forms.gle/c6KUMZ9wDvTvRyDKA" target='_blank'>
                <Button>See Design Concepts</Button>
            </a>
        </div>
    );
}

/*
Currently our website is in the beta stages, which means we're still in the process of adding
in-depth product information, our custom products, and other new website features! While
we complete this process, please feel free to give us insight on your experience and how
we can improve.
*/