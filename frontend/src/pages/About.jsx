const About = () => {
  return (
    <main className="pt-100 px-4 md:px-8">

      <div className="space-y-8  animate-fade-in">
        {/* Skills Section */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-medium">Skills</h2>

          <div className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-neutral-400 mb-2">Languages</div>
              <div className="text-neutral-300">HTML, CSS, JavaScript, Java, Python</div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-neutral-400 mb-2">Frameworks/Libraries</div>
              <div className="text-neutral-300">ReactJS, React Native, Node.js, Express, MongoDB, PostgreSQL</div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-neutral-400 mb-2">Tools/Technologies</div>
              <div className="text-neutral-300">Git, Docker, Docker Compose, Linux (Arch & Ubuntu), Vim, Postman, Firebase, Expo, Cloudinary, Socket.IO, OpenAI API, n8n, TailwindCSS</div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-neutral-400 mb-2">DevOps</div>
              <div className="text-neutral-300">CI/CD, Nginx, Cloud Deployment (Render, Vercel), GitHub Actions</div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg font-medium">Education</h2>

          <div className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <div className="font-medium">Monash University Malaysia</div>
              <div className="text-neutral-300">Bachelor of Computer Science</div>
              <div className="text-neutral-400 text-sm">Expected Graduation: June 2026</div>
              <div className="text-neutral-300 text-sm mt-2">
                Relevant coursework: OOP(Java), Functional Programming (Haskell), Agile Development, Kotlin, C++, Data Structures, Algorithms, Web Development (HTML, CSS, JS), Database Management (SQL), Software Engineering Principles
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;

