import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import StealthCard from './StealthCard';

const THEMES = {
  blue: ['#1C1C1E', '#00424D', '#007080', '#00A8BF', '#00E5FF'],
  crimson: ['#1C1C1E', '#4A0011', '#8B0022', '#CC0030', '#FF003C'],
  green: ['#1C1C1E', '#063816', '#0E6025', '#168935', '#22C55E']
};

const GithubHeatmap = () => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.blue);

  useEffect(() => {
    const updateTheme = () => {
      const style = getComputedStyle(document.documentElement);
      const accentColor = style.getPropertyValue('--accent-color').trim();

      // Map arbitrary RGB values to our known themes
      if (accentColor === '255 0 60') {
        setCurrentTheme(THEMES.crimson);
      } else if (accentColor === '34 197 94') {
        setCurrentTheme(THEMES.green);
      } else {
        // Default to blue for '0 229 255' or any other
        setCurrentTheme(THEMES.blue);
      }
    };

    // Initial check
    updateTheme();

    // Observe changes to the style attribute on the root element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xl font-bold uppercase tracking-widest flex items-center gap-3 text-white">
            <Activity size={18} className="text-electric-blue" />
            KERNEL_PULSE
          </h3>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>

        <StealthCard className="p-4 sm:p-10">
          <div className="w-full overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[800px] flex justify-center">
              <GitHubCalendar
                username="Sakthi102003"
                year={new Date().getFullYear()}
                colorScheme="dark"
                blockSize={10}
                blockMargin={4}
                fontSize={12}
                theme={{
                  dark: currentTheme,
                }}
                renderBlock={(block: any, activity: any) =>
                  React.cloneElement(block, {
                    'data-tooltip-id': 'github-tooltip',
                    'data-tooltip-content': `${activity.count} transmissions on ${activity.date}`,
                  })
                }
              />
              <Tooltip id="github-tooltip" className="!bg-stealth-900 !border !border-white/10 !text-white !font-mono !text-[10px]" />
            </div>
          </div>
        </StealthCard>
      </motion.div>
    </div>
  );
};

export default GithubHeatmap;
