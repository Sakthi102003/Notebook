import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const GithubHeatmap = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const checkColorScheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setColorScheme('dark');
      } else {
        setColorScheme('light');
      }
    };

    checkColorScheme();

    const observer = new MutationObserver(checkColorScheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contributions" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6 sm:mb-8">
            <Github className="text-highlight-blue dark:text-highlight-cyan mr-2 sm:mr-3 flex-shrink-0" size={28} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-notebook font-bold">Contributions</h2>
          </div>

          <div className="notebook-page p-4 sm:p-6 md:p-8 lg:p-12 flex justify-center overflow-x-auto">
             <div className="min-w-[700px]">
               <GitHubCalendar 
                  username="Sakthi102003" 
                  colorScheme={colorScheme}
                  blockSize={12}
                  blockMargin={5}
                  fontSize={16}
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${activity.count} activities on ${activity.date}`,
                    })
                  }
               />
               <Tooltip id="github-tooltip" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubHeatmap;
