import {
    FileCode,
    FileText,
    MessageSquare,
    Settings,
    Folder,
    Monitor,
    Terminal as TerminalIcon,
} from 'lucide-react'

export const FILE_TREE = [
    { id: 'home', label: 'Home', icon: FileCode, category: 'Overview' },
    { id: 'about', label: 'About', icon: FileText, category: 'Profile' },
    { id: 'quotes', label: 'Quotes', icon: MessageSquare, category: 'Inspiration' },
    { id: 'skills', label: 'Skills', icon: Settings, category: 'Stack' },
    { id: 'projects', label: 'Projects', icon: Folder, category: 'Work' },
    { id: 'gears', label: 'Gear', icon: Monitor, category: 'Setup' },
    { id: 'contact', label: 'Contact', icon: TerminalIcon, category: 'Connect' },
]
