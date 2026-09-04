import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Github } from 'lucide-react';

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

const CACHE_KEY = 'latest_github_commit_cache';
const GITHUB_USERNAME = 'Sakthi102003';

const LatestCommit = ({ isSmall = false }: LatestCommitProps) => {
    const [commit, setCommit] = useState<CommitData | null>(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(!commit);

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
                    const commitData: CommitData = {
                        message: latestCommit.commit.message,
                        repo: latestRepo.name,
                        timestamp: latestCommit.commit.author.date,
                        url: latestCommit.html_url,
                        sha: latestCommit.sha.substring(0, 7)
                    };
                    setCommit(commitData);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(commitData));
                    } catch {
                        // Ignore storage quota errors
                    }
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

    if (loading && !commit) return (
        <div className={`w-full ${isSmall ? 'max-w-xs h-16' : 'max-w-md h-24'} border rounded-2xl flex items-center justify-center animate-pulse`} style={{ background: 'var(--card-bg)', borderColor: 'var(--border-subtle)' }}>
             <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-green)' }}>Loading latest work...</span>
        </div>
    );

    if (!commit) return (
        <div className={`w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} border rounded-2xl flex items-center justify-center opacity-50`} style={{ background: 'var(--card-bg)', borderColor: 'var(--border-subtle)' }}>
             <div className="flex items-center gap-2">
                 <GitCommit size={14} style={{ color: 'var(--text-muted)' }} />
                 <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>No recent commits found</span>
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
            className={`block w-full ${isSmall ? 'max-w-xs p-3' : 'max-w-md p-4'} backdrop-blur-md border rounded-2xl group transition-all duration-300 font-mono relative overflow-hidden`}
            style={{ background: 'var(--card-bg)', borderColor: 'var(--border-subtle)' }}
        >
            {/* Background scanning line effect on hover */}
            <div className="absolute inset-0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-linear opacity-0 group-hover:opacity-100" style={{ background: 'rgba(var(--accent-color)/0.05)' }} />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GitCommit size={isSmall ? 10 : 12} style={{ color: 'var(--accent-green)' }} />
                        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--accent-green)' }}>Latest commit</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-60">
                        <Github size={isSmall ? 8 : 10} style={{ color: 'var(--text-muted)' }} />
                        <span className="text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{timeAgo(commit.timestamp)}</span>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <GitCommit size={isSmall ? 14 : 16} className="mt-0.5 flex-shrink-0 transition-colors" style={{ color: 'var(--text-muted)' }} />
                    <div className="min-w-0">
                        <p className={`${isSmall ? 'text-xs' : 'text-sm'} truncate font-semibold transition-colors`} style={{ color: 'var(--text-primary)' }}>
                            {commit.message.split('\n')[0]}
                        </p>
                        <p className={`text-[10px] truncate mt-1 flex items-center gap-1.5`}>
                            <span style={{ color: 'var(--accent-cyan)' }}>/{commit.repo}</span>
                            <span style={{ color: 'var(--text-faint)' }}>@</span>
                            <span style={{ color: 'var(--accent-green)' }}>{commit.sha}</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default LatestCommit;
