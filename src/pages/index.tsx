import LinkButton from 'components/LinkButton';
import { motion } from 'framer-motion';

const IndexPage: React.FC = () => {
  const catVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: {
      rotate: 720,
      scale: 0.1,
      opacity: 0,
    },
    visible: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 2 },
    },
  };
  return (
    <main className="h-screen flex flex-col justify-between py-8 md:items-center md:justify-center md:space-y-16">
      <div className="pt-8 md:pt-0">
        <motion.img
          variants={catVariants}
          initial="hidden"
          animate="visible"
          src="/assets/bongocat-1.png"
          alt="mascot cat"
          width={129}
          height={129}
          className="mx-auto"
        />
        <motion.img
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          src="/assets/Logo.png"
          alt="logo"
          width={240}
          height={179}
          className="mx-auto"
        />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <LinkButton linkText="Join game" href="/game/" />
        <LinkButton linkText="Host a game" href="/game/new" />
      </div>
    </main>
  );
};

export default IndexPage;
