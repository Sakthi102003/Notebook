import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Github, Terminal } from 'lucide-react';

interface CommitData {
    message: string;
    repo: string;
    timestamp: string;
    url: string;
    sha: string;
}

interface LatestCommitProps {
    isSmall?: boolean;
}

const LatestCommit = ({ isSmall = false }: LatestCommitProps) => {
    const [commit, setCommit] = useState<CommitData | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Using Sakthi102003 as verified in previous HeroSection logs
    const GITHUB_USERNAME = 'Sakthi102003';

    useEffect(() => {
        const fetchLatestCommit = async () => {
            try {
                // 1. Get the user's most recently updated repository
                const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=1`);
                if (!repoRes.ok) throw new Error('Failed to fetch repositories');
                const repos = await repoRes.json();
                
                if (repos.length === 0) return;
                const latestRepo = repos[0];

                // 2. Get the latest commit from that repository
                const commitRes = await fetch(`https://api.github.com/repos/${latestRepo.full_name}/commits?per_page=1`);
                if (!commitRes.ok) throw new Error('Failed to fetch commits');
                const commits = await commitRes.json();

                if (commits.length > 0) {
                    const latestCommit = commits[0];
                    setCommit({
                        message: latestCommit.commit.message,
                        repo: latestRepo.name,
                        timestamp: latestCommit.commit.author.date,
                        url: latestCommit.html_url,
                        sha: latestCommit.sha.substring(0, 7)
                    });
                }
            } catch (error) {
                console.error('Error fetching commit:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestCommit();
        
        // Poll every 5 minutes
        const interval = setInterval(fetchLatestCommit, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    if (loading) return (
        <div className={`w-full ${isSmall ? 'max-w-xs h-16' : 'max-w-md h-24'} bg-stealth-800/40 border border-white/5 rounded-2xl flex items-center justify-center animate-pulse`}>
             <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.3em]">Decrypting_Git_Logs...</span>
        </div>
    );

    if (!commit) return (
        <div className={`w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} bg-stealth-800/20 border border-white/5 rounded-2xl flex items-center justify-center opacity-50`}>
             <div className="flex items-center gap-2">
                 <Terminal size={14} className="text-gray-500" />
                 <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">No_Recent_Commits_Found</span>
             </div>
        </div>
    );

    return (
        <motion.a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`block w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} bg-stealth-800/40 backdrop-blur-md border border-white/5 rounded-2xl group hover:bg-stealth-800/60 hover:border-green-500/30 transition-all duration-300 font-mono relative overflow-hidden`}
        >
            {/* Background scanning line effect on hover */}
            <div className="absolute inset-0 bg-green-500/5 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-linear opacity-0 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal size={isSmall ? 10 : 12} className="text-green-500" />
                        <span className="text-[9px] text-green-500 font-bold tracking-widest uppercase">Live_Commit</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-60">
                        <Github size={isSmall ? 8 : 10} className="text-gray-400" />
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider">{timeAgo(commit.timestamp)}</span>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <GitCommit size={isSmall ? 14 : 16} className="text-gray-500 mt-0.5 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                    <div className="min-w-0">
                        <p className={`${isSmall ? 'text-xs' : 'text-sm'} text-gray-300 truncate font-semibold group-hover:text-white transition-colors`}>
                            {commit.message.split('\n')[0]}
                        </p>
                        <p className={`text-[10px] text-gray-500 truncate mt-1 flex items-center gap-1.5`}>
                            <span className="text-electric-blue/70">/{commit.repo}</span>
                            <span className="text-white/20">@</span>
                            <span className="text-green-500/70">{commit.sha}</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default LatestCommit;