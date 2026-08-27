import { useEffect } from 'react'

interface CursorPalette {
    name: string
    light: string   // tip highlight
    mid: string     // main body
    dark: string    // shadowed base
}

const PALETTES: CursorPalette[] = [
    { name: 'gold', light: 'FFE9B8', mid: 'E2A33D', dark: 'B9791F' },
    { name: 'rose-gold', light: 'FDE4DA', mid: 'E0A899', dark: 'B76E79' },
    { name: 'copper', light: 'FCE2C8', mid: 'D98A4B', dark: '8B4A21' },
    { name: 'silver', light: 'F5F5F5', mid: 'C7C7C7', dark: '8A8A8A' },
    { name: 'teal', light: 'D8F5E3', mid: '3F6C5D', dark: '2C4C41' },
    { name: 'sapphire', light: 'DCEBFB', mid: '3B6EA5', dark: '1F3F63' },
]

function buildArrowCursor(p: CursorPalette): string {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 28 28'>
        <defs>
            <linearGradient id='g1' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stop-color='%23${p.light}'/>
                <stop offset='45%' stop-color='%23${p.mid}'/>
                <stop offset='100%' stop-color='%23${p.dark}'/>
            </linearGradient>
            <filter id='sh' x='-50%' y='-50%' width='200%' height='200%'>
                <feDropShadow dx='0.5' dy='1' stdDeviation='0.8' flood-color='%23000000' flood-opacity='0.45'/>
            </filter>
        </defs>
        <path filter='url(%23sh)' d='M5 2.5 C4.6 2.1 4 2.4 4 3 V22.4 C4 23.2 5 23.5 5.5 22.9 L9.6 18.2 L12.6 24.7 C12.9 25.3 13.6 25.5 14.1 25.2 L16.4 24.1 C16.9 23.8 17.1 23.2 16.8 22.6 L13.9 16.3 L20.2 15.7 C20.9 15.6 21.1 14.7 20.6 14.3 Z' fill='url(%23g1)' stroke='%23FFF7E6' stroke-width='0.6' stroke-linejoin='round'/>
        <path d='M6 5.2 L6 15.5 L8.4 12.9 L9.3 12.9 Z' fill='%23FFF3D6' opacity='0.55'/>
    </svg>`.replace(/\s+/g, ' ').trim()

    return `url("data:image/svg+xml,${svg}") 4 2, auto`
}

function buildPointerCursor(p: CursorPalette): string {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 30 30'>
        <defs>
            <linearGradient id='g2' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stop-color='%23${p.light}'/>
                <stop offset='45%' stop-color='%23${p.mid}'/>
                <stop offset='100%' stop-color='%23${p.dark}'/>
            </linearGradient>
            <filter id='sh2' x='-50%' y='-50%' width='200%' height='200%'>
                <feDropShadow dx='0.5' dy='1' stdDeviation='0.8' flood-color='%23000000' flood-opacity='0.45'/>
            </filter>
        </defs>
        <g filter='url(%23sh2)' fill='url(%23g2)' stroke='%23FFF7E6' stroke-width='0.6' stroke-linejoin='round'>
            <path d='M11 6.5c0-1.1.9-2 2-2s2 .9 2 2v6.2c.3-.1.7-.2 1-.2 1 0 1.9.6 2.3 1.5.3-.1.6-.2 1-.2 1.2 0 2.2.9 2.3 2.1.3-.1.6-.1.9-.1 1.3 0 2.4 1.1 2.4 2.4v3.6c0 3.3-2.7 6-6 6h-3.1c-1.7 0-3.4-.7-4.5-2l-5.9-6.5c-.8-.9-.8-2.2.1-3 .8-.8 2.1-.7 2.9.1L11 17V6.5Z'/>
        </g>
        <path d='M13.2 6.2c0-.5.4-.8.8-.8s.8.3.8.8v7.6c0 .3-.3.6-.6.6s-.6-.3-.6-.6z' fill='%23FFF3D6' opacity='0.6'/>
    </svg>`.replace(/\s+/g, ' ').trim()

    return `url("data:image/svg+xml,${svg}") 6 2, pointer`
}

const STYLE_TAG_ID = 'dynamic-cursor-style'

const CustomCursor = () => {
    useEffect(() => {
        const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)]

        const css = `
            @media (hover: hover) and (pointer: fine) {
                html, body {
                    cursor: ${buildArrowCursor(palette)} !important;
                }
                a, button, [role="button"], input, textarea, select, label, summary,
                .cursor-pointer, [data-cursor="pointer"] {
                    cursor: ${buildPointerCursor(palette)} !important;
                }
            }
        `

        let styleTag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null
        if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.id = STYLE_TAG_ID
            document.head.appendChild(styleTag)
        }
        styleTag.textContent = css

        return () => {
            styleTag?.remove()
        }
    }, [])

    return null
}

export default CustomCursor