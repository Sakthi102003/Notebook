import VisitorCounter from '../features/VisitorCounter'

export default function ContentFooter() {
    return (
        <footer className="border-t border-white/5 py-12 text-center space-y-8">
            <div className="flex justify-center gap-8 text-[10px] font-mono text-white/20 tracking-[0.2em]">
                <span>Made with care</span>
                <span>Based in India</span>
            </div>

            <div className="flex justify-center">
                <VisitorCounter />
            </div>

            <p className="text-xs text-gray-600 tracking-wide">
                &copy; {new Date().getFullYear()} Sakthimurugan. Thanks for stopping by.
            </p>
        </footer>
    )
}
