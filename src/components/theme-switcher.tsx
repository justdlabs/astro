'use client'
import { IconMoon, IconSun } from 'justd-icons'
import { Button } from 'ui'
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") ?? "light";
        setTheme(savedTheme);
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSwitchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <Button
            appearance="outline"
            size="square-petite"
            aria-label={'Switch to ' + theme === 'light' ? 'dark' : 'light' + 'mode'}
            onPress={handleSwitchTheme}
        >
            <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <IconMoon
                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        </Button>
    )
}
