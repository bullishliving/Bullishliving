
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  text: string;
  textStyle?: string;
  containerStyles?: string
  straight?: boolean
}

export default function AnimatedTitle({ text, textStyle, containerStyles, straight }: Props) {
  const splitText = useMemo(() => {
    const textVatiants = {
      initial: {
        y: '128%',
        rotate: straight ? 0 : 5,
      },
      animate: {
        y: 0,
        rotate: 0,
      },
    };

    return (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className={`flex flex-wrap ${containerStyles}`}
      >
        {text.split(' ').map((word, index) => (
          <div key={index} className={`${textStyle} overflow-hidden`}>
            <motion.span
              variants={textVatiants}
              transition={{
                ease: 'easeInOut',
                duration: 0.65,
                delay: 0.025 * index,
              }}
              className="overflow-hidden inline-block"
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>
    );
  }, [text, textStyle, containerStyles, straight]);
  return splitText;
}
