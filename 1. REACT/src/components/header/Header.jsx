import logo from '../../assets/images/logo.webp'
import classes from './Header.module.scss'

function Header() {
    const links = [
        {
            text: "Google",
            href: "https://google.com/"
        },
        {
            text: "Discord",
            href: "https://discord.com/"
        },
        {
            text: "Vite",
            href: "https://vite.dev/"
        },
        {
            text: "Parcel",
            href: "https://parceljs.org/"
        },
        {
            text: "Webpack",
            href: "https://webpack.js.org/"
        },
        {
            text: "Google meet",
            href: "https://meet.google.com/landing"
        }
    ]

    const linksTags = links.map((link, index) => {
        return <a key={index} href={link.href}>{link.text}</a>
    })

    console.log(links)
    console.log(linksTags)

    return (
        <header className={classes.header}>
            <img className={classes['header-logo']} src={logo} alt="" />
            <div className={classes.links}>
                {linksTags}
            </div>
            <button className={classes.button}>Login</button>
        </header>
    )
}

export default Header
