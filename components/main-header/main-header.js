"use client"
import Link from "next/link";
import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import { usePathname } from "next/navigation";
import NavLink from "../nav/nav-link";

export default function Main_Header() {
    const path = usePathname()
    return (
        <>
        <MainHeaderBackground />
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image src={logoImg} alt="A plate with food on it" priority />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse meals</NavLink>
                            {/* <Link href="/meals" className={path.startsWith('/meals') ? classes.active : undefined}>Browse meals</Link> */}
                        </li>
                        <li>
                        <NavLink href="/community">Foodies Community</NavLink>
                            {/* <Link href="/community" className={path.startsWith('/community') ? classes.active : undefined}>Foodies Community</Link> */}
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}