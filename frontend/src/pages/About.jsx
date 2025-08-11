const About = () => {
  return (
    <div className="space-y-8 animate-fade-in">
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
              Relevant coursework: OOP(Java), Functional Programming (Haskell), Agile Development
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-lg font-medium">Experience</h2>
        
        <div className="space-y-6">
          <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">Full-Stack Developer</div>
              <div className="text-neutral-400 text-sm">Nov 2024 — Present</div>
            </div>
            <div className="text-neutral-300 mb-2">Stayfur Web App</div>
            <div className="text-neutral-400 text-sm mb-3">MERN Stack, TailwindCSS, Zustand, Cloudinary, Socket.IO</div>
            <ul className="text-neutral-300 text-sm space-y-1">
              <li>• Real-world company project for pet hotel booking with live users and production deployment</li>
              <li>• Built admin and owner dashboards to manage listings, bookings, and availability</li>
              <li>• Used Zustand to manage global UI state such as booking flow, user authentication, and chat modal state</li>
              <li>• Built intuitive frontend UI with React and TailwindCSS, supporting responsive design</li>
              <li>• Designed and implemented RESTful APIs and WebSocket connections using Socket.IO</li>
              <li>• Enabled secure image uploads using Cloudinary, with efficient media storage in MongoDB</li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '1.0s' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">React Native Developer</div>
              <div className="text-neutral-400 text-sm">June 2025 — Present</div>
            </div>
            <div className="text-neutral-300 mb-2">Stayfur Mobile App</div>
            <div className="text-neutral-400 text-sm mb-3">React Native, MongoDB, Expo, Push Notification, React Navigation, n8n AI Agent (RAG)</div>
            <ul className="text-neutral-300 text-sm space-y-1">
              <li>• Developed a cross-platform mobile app using React Native and Expo</li>
              <li>• Implemented push notifications using Expo and Firebase Cloud Messaging (FCM)</li>
              <li>• Integrated AI agent with n8n RAG workflow, enabling intelligent in-app chat support</li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '1.1s' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">Full-Stack Developer</div>
              <div className="text-neutral-400 text-sm">Feb 2025 — Present</div>
            </div>
            <div className="text-neutral-300 mb-2">Deepfake Detection Web App</div>
            <div className="text-neutral-400 text-sm mb-3">NextJS, FastAPI, OpenCV, PyTorch, Docker, Docker Compose</div>
            <ul className="text-neutral-300 text-sm space-y-1">
              <li>• Built a web platform to detect deepfake images using machine learning models</li>
              <li>• Developed frontend with NextJS and backend with FastAPI</li>
              <li>• Trained a convolutional neural network (CNN) in PyTorch using deepfake datasets</li>
              <li>• Used OpenCV for video frame extraction and preprocessing</li>
              <li>• Fully Dockerized the application, including FastAPI backend</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Section */}
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: '1.2s' }}>
        <h2 className="text-lg font-medium">Additional</h2>
        <div className="text-neutral-300">
          • Self-Hosted Resume Website — Deployed personal portfolio using Nginx and Docker on home server
        </div>
      </div>
    </div>
  );
};

export default About;

