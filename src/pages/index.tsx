import LinkButton from 'components/LinkButton';

const IndexPage: React.FC = () => {
  return (
    <main className="h-screen flex flex-col justify-between py-8 md:items-center md:justify-center md:space-y-16">
      <div className="pt-8 md:pt-0">
        <img src="/assets/bongocat-1.png" alt="mascot cat" width={129} height={129} className="mx-auto" />
        <img src="/assets/Logo.png" alt="logo" width={240} height={179} className="mx-auto" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <LinkButton linkText="Join game" href="/game/" />
        <LinkButton linkText="Host a game" href="/game/new" />
      </div>
    </main>
  );
};

export default IndexPage;
