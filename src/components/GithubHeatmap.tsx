import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import StealthCard from './StealthCard';

const GithubHeatmap = () => {
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

        <StealthCard className="p-6 sm:p-10 flex justify-center overflow-x-auto no-scrollbar">
          <div className="min-w-[700px] opacity-80 hover:opacity-100 transition-opacity">
            <GitHubCalendar
              username="Sakthi102003"
              year={new Date().getFullYear()}
              colorScheme="dark"
              blockSize={12}
              blockMargin={5}
              fontSize={14}
              theme={{
                dark: ['#1C1C1E', '#00424D', '#007080', '#00A8BF', '#00E5FF'],
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  'data-tooltip-id': 'github-tooltip',
                  'data-tooltip-content': `${activity.count} transmissions on ${activity.date}`,
                })
              }
            />
            <Tooltip id="github-tooltip" className="!bg-stealth-900 !border !border-white/10 !text-white !font-mono !text-[10px]" />
          </div>
        </StealthCard>
      </motion.div>
    </div>
  );
};

export default GithubHeatmap;
