const Home = () => {
  return (
    <div className="max-w-4xl space-y-6 md:space-y-8 fade-in">
      {/* Personal Bio */}
      <div className="space-y-4 md:space-y-6">
        <p className="text-base-mono md:text-lg-mono leading-relaxed">
          I'm Kai, a Full-Stack Developer with over a decade of experience working with early-stage startups and established companies. I thrive in the early stages of company and product development, collaborating closely with founders to take companies from 0 → 1 and successfully launch their products into the world.
        </p>
        
        <p className="text-base-mono md:text-lg-mono leading-relaxed">
          A firm believer in "skin in the game," I now partner with founders and startups seeking a more permanent arrangement in the form of equity or revenue share, where the initial cost is offset in favour of a long-term partnership with vested interests in success.
        </p>
        
        <p className="text-base-mono md:text-lg-mono leading-relaxed">
          Whether you're interested in this approach or prefer a more traditional partnership, feel free to reach out via email or social media.
        </p>
      </div>

      {/* Selected Clients */}
      <div className="space-y-3 md:space-y-4">
        <h3 className="text-lg-mono md:text-xl-mono font-medium">Selected Clients</h3>
        <p className="text-sm-mono md:text-base-mono">
          Mastercard, The Bank of London, Scan.com, Labour, Cosmos, NHS, SOMO, Portal Gaming, Avallen, Alyssa Kapito, Honey & Jam, Rinkl.
        </p>
      </div>

      {/* Availability */}
      <div className="space-y-3 md:space-y-4">
        <p className="text-sm-mono md:text-base-mono">
          Available for new projects from Q1 2025.
          </p>
        </div>

      {/* Call to Action */}
      <div className="pt-6 md:pt-8 border-t border-gray-800">
        <p className="text-sm-mono md:text-base-mono">
          Let's build something amazing together. 
          <a href="/contact" className="hover-underline ml-2">
            Get in touch →
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;

