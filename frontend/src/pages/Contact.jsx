import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-medium">Contact</h2>
        <p className="text-neutral-300">
          I'm always interested in hearing about new opportunities and exciting projects.
          Whether you have a question or just want to say hi, feel free to reach out.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-medium">Get in Touch</h3>

          <div className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-neutral-400 mb-1">Email</div>
              <a href="mailto:tanwenkai.work@gmail.com" className="text-neutral-300 hover:underline">
                tanwenkai.work@gmail.com
              </a>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-neutral-400 mb-1">GitHub</div>
              <a href="https://github.com/Ckaii" className="text-neutral-300 hover:underline">
                github.com/Ckaii
              </a>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-neutral-400 mb-1">LinkedIn</div>
              <a href="https://linkedin.com/in/ckaiitan" className="text-neutral-300 hover:underline">
                linkedin.com/in/ckaiitan
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-lg font-medium">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <label htmlFor="name" className="block text-neutral-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-neutral-600 text-white placeholder-neutral-400 focus:border-white focus:outline-none transition-colors duration-300"
                placeholder="Your name"
                required
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
              <label htmlFor="email" className="block text-neutral-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-neutral-600 text-white placeholder-neutral-400 focus:border-white focus:outline-none transition-colors duration-300"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '1.0s' }}>
              <label htmlFor="subject" className="block text-neutral-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-neutral-600 text-white placeholder-neutral-400 focus:border-white focus:outline-none transition-colors duration-300"
                placeholder="Project inquiry"
                required
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '1.1s' }}>
              <label htmlFor="message" className="block text-neutral-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 bg-transparent border border-neutral-600 text-white placeholder-neutral-400 focus:border-white focus:outline-none resize-none transition-colors duration-300"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
              <button
                type="submit"
                className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Availability */}
      <div className="pt-8 border-t border-neutral-800 animate-slide-up" style={{ animationDelay: '1.3s' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Availability</h3>
          <p className="text-neutral-300">
            I'm currently available for new projects and collaborations.
            I typically respond to emails within 24 hours.
          </p>
          <p className="text-neutral-300">
            Available for new projects and collaborations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

