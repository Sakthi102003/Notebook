import VisitorCounter from '../features/VisitorCounter'

export default function ContentFooter() {
    return (
        <footer className="border-t border-white/5 py-12 text-center space-y-8">
            <div className="flex justify-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                <span>Version 2.0.4-STABLE</span>
                <span>Environment: Production</span>
                <span>Region: DEPLOY_GLOBAL</span>
            </div>

            <div className="flex justify-center">
                <VisitorCounter />
            </div>

            <p className="text-xs text-gray-600 uppercase tracking-widest font-mono">
                &copy; {new Date().getFullYear()} SAKTHI_MURUGAN // STEALTH_PROTOCOL // ALL_SYSTEMS_GO
            </p>
        </footer>
    )
}
