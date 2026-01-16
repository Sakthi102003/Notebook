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
    { id: 'home', label: 'index.tsx', icon: FileCode, category: 'src' },
    { id: 'about', label: 'bio.md', icon: FileText, category: 'src/identity' },
    { id: 'quotes', label: 'quotes.log', icon: MessageSquare, category: 'src/data' },
    { id: 'skills', label: 'stack.json', icon: Settings, category: 'src/capability' },
    { id: 'projects', label: 'ops/', icon: Folder, category: 'src/deployments', isFolder: true },
    { id: 'gears', label: 'gears.cfg', icon: Monitor, category: 'src/sys' },
    { id: 'contact', label: 'relay.log', icon: TerminalIcon, category: 'src/comm' },
]
