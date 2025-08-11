const Home = () => {
  return (
    <div className="space-y-12 fade-in leading-relaxed max-w-3xl mx-auto px-6">
      {/* Info Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">Info</h2>
        <p className="text-lg text-gray-300 whitespace-pre-line">
          {"I'm Kai, a Full-Stack Developer and Computer Science student at Monash University Malaysia, passionate about building scalable, user-focused web and mobile applications. My work spans frontend, backend, mobile, and DevOps, with hands-on experience taking projects from concept to production.\n\nI’ve worked on real-world applications like Stayfur, a pet-friendly accommodation booking platform with live users, and a deepfake detection web app. I enjoy solving complex problems with clean, efficient code, and I’m constantly exploring new technologies to deliver better user experiences.\n\nWhether it’s developing cross-platform mobile apps, optimizing cloud deployments, or integrating AI into products, I thrive in collaborative environments where I can contribute to both the technical foundation and the end-user experience."}
        </p>
      </section>

      {/* Selected Projects */}
      <section className="space-y-6">
        <h3 className="font-semibold text-xl tracking-tight">Selected Projects</h3>
        <p className="text-lg text-gray-300 whitespace-pre-line">
          {"Stayfur Web & Mobile App, Deepfake Detection Platform,\nPersonal Portfolio (Self-hosted with Docker & Nginx)."}
        </p>
      </section>

      {/* Availability */}
      <section className="space-y-4">
        <p className="text-lg text-gray-300">
          Available for internships and freelance projects from <span className="font-medium">Q4 2025</span>.
        </p>
      </section>

      {/* Call to Action */}
      <section className="pt-10 border-t border-gray-700">
        <p className="text-lg">
          Let’s create impactful software together.
          <a
            href="/contact"
            className="hover:underline ml-2 text-indigo-400 font-medium"
          >
            Get in touch →
          </a>
        </p>
      </section>
    </div>
  );
};

export default Home;

