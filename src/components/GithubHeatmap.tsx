import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Activity, Box } from 'lucide-react';
import StealthCard from './StealthCard';

const THEMES = {
  blue: ['#1C1C1E', '#00424D', '#007080', '#00A8BF', '#00E5FF'],
  crimson: ['#1C1C1E', '#4A0011', '#8B0022', '#CC0030', '#FF003C'],
  green: ['#1C1C1E', '#063816', '#0E6025', '#168935', '#22C55E']
};

const WAKATIME_URL = "https://wakatime.com/share/@sakthi102003/bb59c90a-832d-461d-a383-e5722a3fba24.json";

const GithubHeatmap = () => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.blue);
  const [wakaStats, setWakaStats] = useState<string>('Initializing...');
  const [wakaLabel, setWakaLabel] = useState<string>('System Status');

  useEffect(() => {
    const updateTheme = () => {
      const style = getComputedStyle(document.documentElement);
      const accentColor = style.getPropertyValue('--accent-color').trim();

      if (accentColor === '255 0 60') {
        setCurrentTheme(THEMES.crimson);
      } else if (accentColor === '34 197 94') {
        setCurrentTheme(THEMES.green);
      } else {
        setCurrentTheme(THEMES.blue);
      }
    };

    updateTheme();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updateTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Fetch Wakatime
    fetch(WAKATIME_URL)
      .then(res => res.json())
      .then(data => {
        console.log("Wakatime API Response:", data);

        // Logic to extract meaningful text
        // Handle "Editors" (Circular Chart) JSON
        if (data.data && Array.isArray(data.data) && data.data[0]?.name) {
          const vsCode = data.data.find((e: any) => e.name === 'VS Code');
          if (vsCode) {
            setWakaLabel('VS Code Usage');
            setWakaStats(vsCode.text);
          } else {
            setWakaLabel('Total Editor Usage');
            setWakaStats(data.data[0].text); // Top editor
          }
        }
        // Handle "Activity" (Bar Chart) JSON
        else if (data.data && Array.isArray(data.data) && data.data[0]?.range) {
          // Usually last item is most recent day or similar. 
          // Wakatime activity arrays are typically chronological.
          const lastDay = data.data[data.data.length - 1];
          if (lastDay && lastDay.grand_total) {
            setWakaLabel(`Worked ${new Date(lastDay.range.date).toLocaleDateString('en-US', { weekday: 'short' })}`);
            setWakaStats(lastDay.grand_total.text);
          } else {
            console.warn("Wakatime: No matching data format found or empty data");
            setWakaLabel('System Status');
            setWakaStats('No Data Available');
          }
        } else {
          // Real data not ready yet
          console.warn("Wakatime: Link empty (sync pending).");
          setWakaLabel('WakaTime Status');
          setWakaStats('Data Pending...');
        }
      })
      .catch((error) => {
        console.error("Wakatime Error:", error);
        setWakaStats('Offline');
        setWakaLabel('Signal Lost');
      });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <StealthCard className="p-0 overflow-hidden border border-white/5 bg-stealth-900/50">
          {/* Header Section matching the Screenshot */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-white/5 bg-stealth-800/20 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-electric-blue/70">
                Featured System
              </div>
              <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                <Activity size={20} className="text-electric-blue" />
                GITHUB_ACTIVITY
              </h3>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shadow-[0_0_8px_#00E5FF]" />
                <span>ONLINE</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2 text-gray-300">
                <Box size={14} className="text-electric-blue" />
                <span className="opacity-60 uppercase tracking-wider">{wakaLabel}:</span>
                <span className="text-white font-bold">{wakaStats}</span>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden p-6 md:p-8 bg-stealth-900/20">
            <div className="w-full overflow-x-auto no-scrollbar flex justify-start md:justify-center">
              <div className="min-w-[700px] lg:min-w-full flex justify-center">
                <GitHubCalendar
                  username="Sakthi102003"
                  year={new Date().getFullYear()}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  theme={{
                    dark: currentTheme,
                  }}
                  renderBlock={(block: any, activity: any) =>
                    React.cloneElement(block, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                    })
                  }
                />
              </div>
            </div>
            <Tooltip id="github-tooltip" className="!bg-stealth-900 !border !border-white/10 !text-white !font-mono !text-[10px] !py-1 !px-2 !rounded-none" />
          </div>
        </StealthCard>
      </motion.div>
    </div>
  );
};

export default GithubHeatmap;
