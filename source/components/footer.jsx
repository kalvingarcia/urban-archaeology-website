"use client"
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {useState} from 'react';
import {tss} from 'tss-react';
import {useTheme} from './common/theme';
import {Heading, Subheading} from './common/typography';
import Button from './common/button';
import Modal from './common/modal';

const useStyles = tss.create(({theme}) => ({
    footer: {
        width: "100%",
        backgroundColor: theme.surface,
        color: theme.body
    },
    content: {
        maxWidth: "1500px",
        margin: "auto",
        display: "flex",
        gap: "40px",
        padding: "20px"
    },
    locations: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "33%",
        "@media (max-width: 800px)": { // On mobile the location are put into a popup
            display: "none"
        },

        "& .location": {
            display: "flex",
            flexDirection: "column"
        },
        "& .divider": {
            height: "1pt",
            width: "66%",
            alignSelf: "center",
            backgroundColor: theme.body,
            opacity: 0.5
        }
    },
    links: {
        width: "34%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        "@media (max-width: 800px)": { // Links are the only objects shown in the footer on mobile
            width: "100%",
            flexDirection: "row",
        },

        "& a": { // Resetting the links
            textDecoration: "none",
            color: theme.body
        }
    },
    navigation: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "@media (max-width: 800px)": { // When on mobile the navigation is 50% of the footer
            width: "50%",
        },

        "& .active": {
            fontWeight: "bold"
        }
    },
    socials: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "@media (max-width: 800px)": { // When on mobile the socials are 50% of the footer
            width: "50%"
        },

        "& .icons": {
            display: "flex",
            gap: "10px",

            "& .urban-icons": {
                fontSize: "32px"
            }
        },

        // This contact button only appears on mobile under the socials
        "& .contact": {
            display: "none",
            "@media (max-width: 800px)": {
                display: "block",
                alignSelf: "center",
                marginTop: "30px"
            }
        }
    },
    credits: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
        backgroundColor: theme.primary,
        color: theme.onPrimary,

        "& a": {
            textDecoration: "none",
            color: theme.onSecondary  
        },

        "& .accredation": {
            fontSize: "0.75rem",
            padding: "10px",
        }
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflow: "auto",

        "& .location": {
            display: "flex",
            flexDirection: "column"
        },
        "& .divider": {
            height: "1pt",
            width: "66%",
            alignSelf: "center",
            backgroundColor: theme.body,
            opacity: 0.5
        }
    }
}));

/**
 * This is the footer of the website. It will hold the company location/contact information,
 * as well as, the information about the copyright and accredation. When the website is on mobile
 * The footer changes structure and instead opens a popup for location/contact information.
 */
export default function Footer() {
    const [open, setOpen] = useState(false); // This keeps track of if the popup is open or not
    const pathname = usePathname();

    const theme = useTheme();
    const {classes} = useStyles({theme});
    return (
        <section className={classes.footer}>
            <div className={classes.content}>
                <div className={classes.links}>
                    <div className={classes.navigation}>
                        <Heading>Navigation</Heading>
                        <Link className={pathname === '/'? "active" : ""} href="/">Home</Link>
                        <Link className={pathname === '/catalog'? "active" : ""} href="/catalog">Catalog</Link>
                        <Link className={pathname === '/salvage'? "active" : ""} href="/salvage">Salvage</Link>
                        <Link className={pathname === '/gallery'? "active" : ""} href="/gallery">Gallery</Link>
                    </div>
                    <div className={classes.socials}>
                        <Heading>Socials</Heading>
                        <div className='icons'>
                            <Link className='urban-icons' href="https://www.facebook.com/urbanarchaeologyltd">facebook_logo</Link>
                            <Link className='urban-icons' href="https://instagram.com/urbanarchaeologyltd">instagram_logo</Link>
                            <Link className='urban-icons' href="https://pinterest.com/urbanarchltd/">pinterest_logo</Link>
                            <Link className='urban-icons' href="https://www.linkedin.com/company/urban-archaeology/">linkedin_logo</Link>
                        </div>
                        <Button className='contact' role="primary" style="filled" onClick={() => setOpen(true)}>Contact Us</Button>
                    </div>
                </div>
                <div className={classes.locations}>
                    <Heading>Locations</Heading>
                    <div className='location'>
                        <Subheading>New York (Showroom)</Subheading>
                        <span>158 Franklin Street, New York, NY 10013</span>
                        <span>(212) 371-4646</span>
                        <Link href="mailto:ny@urbanarchaeology.com">ny@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <b>Showroom Hours</b>
                        <span>Monday-Friday: 8:00 AM to 5:00 PM</span>
                        <span>Saturday and Sunday: Closed</span>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.939308536255!2d-74.01069595827086!3d40.7193525372826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258e5d67c4c2b%3A0xecfd9b6a06dfc53!2sUrban%20Archaeology!5e0!3m2!1sen!2sus!4v1712259752936!5m2!1sen!2sus"
                            style={{border: 0, aspectRatio: 16 / 9, maxWidth: "500px"}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
                <div className={classes.locations}>
                    <div className='location'>
                        <Subheading>Long Island City (Workshop)</Subheading>
                        <span>43-34 32nd Place, 2R, Long Island City, NY 11101</span>
                        <span>(212) 413-4646</span>
                        <Link href="mailto:gil@urbanarchaeology.com">gil@urbanarchaeology.com</Link>
                    </div>
                    <div className='divider' />
                    <div className='location'>
                        <Subheading>Boston and San Francisco</Subheading>
                        <span>(617) 737-4646</span>
                        <Link href="mailto:johnw@urbanarchaeology.com">johnw@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <Subheading>Chicago</Subheading>
                        <span>(312) 371 2249</span>
                        <Link href="mailto:melissa@urbanarchaeology.com">melissa@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <Subheading>Southeast</Subheading>
                        <span>(917) 685-6113</span>
                        <Link href="mailto:adrienne@urbanarchaeology.com">adrienne@urbanarchaeology.com</Link>
                    </div>
                </div>
            </div>
            <div className={classes.credits}>
                <span>Copyright © 2012-2024 Urban Archaeology Ltd. All rights reserved.</span>
                <Link href="/terms">Terms and conditions apply.</Link>
                <span className='accredation'>Designed and built by <Link href="https://www.kalvingarcia.com">Kalvin Garcia</Link></span>
            </div>

            <Modal open={open} setOpen={setOpen}>
                <div className={classes.modal}>
                    <Heading>Locations</Heading>
                    <div className={classes.locations}>
                        <Subheading>New York (Showroom)</Subheading>
                        <span>158 Franklin Street, New York, NY 10013</span>
                        <span>(212) 371-4646</span>
                        <span>Fax: (212) 371-1601</span>
                        <Link href="mailto:ny@urbanarchaeology.com">ny@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <b>Showroom Hours</b>
                        <span>Monday-Friday: 8:00 AM to 5:00 PM</span>
                        <span>Saturday and Sunday: Closed</span>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.939308536255!2d-74.01069595827086!3d40.7193525372826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258e5d67c4c2b%3A0xecfd9b6a06dfc53!2sUrban%20Archaeology!5e0!3m2!1sen!2sus!4v1712259752936!5m2!1sen!2sus"
                            style={{border: 0, aspectRatio: 16 /9}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className='location'>
                        <Subheading>Long Island City (Workshop)</Subheading>
                        <span>43-34 32nd Place, 2R Long Island City, NY 11101</span>
                        <span>(212) 413-4646</span>
                        <span>Fax: (212) 334-4659</span>
                        <Link href="mailto:gil@urbanarchaeology.com">gil@urbanarchaeology.com</Link>
                    </div>
                    <div className='divider' />
                    <div className='location'>
                        <Subheading>Boston and San Francisco</Subheading>
                        <span>(617) 737-4646</span>
                        <span>Fax: (617) 737 6699</span>
                        <Link href="mailto:mary@urbanarchaeology.com">mary@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <Subheading>Chicago</Subheading>
                        <span>(312) 371 2249</span>
                        <Link href="mailto:melissa@urbanarchaeology.com">melissa@urbanarchaeology.com</Link>
                    </div>
                    <div className='location'>
                        <Subheading>Southeast</Subheading>
                        <span>(917) 685-6113</span>
                        <Link href="mailto:adrienne@urbanarchaeology.com">adrienne@urbanarchaeology.com</Link>
                    </div>
                </div>
            </Modal>
        </section>
    );
}