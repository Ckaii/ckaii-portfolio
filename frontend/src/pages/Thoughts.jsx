const Thoughts = () => {
  const thoughts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends in web development and what they mean for the industry.",
      date: "December 2023",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      id: 2,
      title: "Building Scalable Applications",
      excerpt: "Lessons learned from building and scaling web applications for millions of users.",
      date: "November 2023",
      readTime: "8 min read",
      category: "Development"
    },
    {
      id: 3,
      title: "Design Systems in Practice",
      excerpt: "How to create and maintain effective design systems for modern web applications.",
      date: "October 2023",
      readTime: "6 min read",
      category: "Design"
    },
    {
      id: 4,
      title: "Startup Lessons Learned",
      excerpt: "Key insights from working with early-stage startups and helping them scale.",
      date: "September 2023",
      readTime: "7 min read",
      category: "Business"
    },
    {
      id: 5,
      title: "Performance Optimization",
      excerpt: "Techniques and strategies for optimizing web application performance.",
      date: "August 2023",
      readTime: "10 min read",
      category: "Development"
    },
    {
      id: 6,
      title: "Remote Work Best Practices",
      excerpt: "How to maintain productivity and collaboration in remote development teams.",
      date: "July 2023",
      readTime: "4 min read",
      category: "Work"
    }
  ];

  return (
    <div className="max-w-4xl space-y-8 fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl-mono font-medium">Thoughts</h2>
        <p className="text-base-mono text-gray-300">
          Writing about technology, development, design, and the lessons learned from building products and working with startups.
        </p>
      </div>

      {/* Thoughts Grid */}
      <div className="grid grid-cols-1 gap-8">
        {thoughts.map((thought) => (
          <article key={thought.id} className="space-y-4 p-6 border border-gray-800 hover:border-gray-600 transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="text-lg-mono font-medium hover-underline cursor-pointer">
                {thought.title}
              </h3>
              <span className="text-sm-mono text-gray-400">{thought.date}</span>
            </div>
            
            <p className="text-base-mono leading-relaxed text-gray-300">
              {thought.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs-mono px-2 py-1 border border-gray-600 text-gray-300">
                  {thought.category}
                </span>
                <span className="text-sm-mono text-gray-400">
                  {thought.readTime}
                </span>
              </div>
              
              <a 
                href={`/thoughts/${thought.id}`} 
                className="text-sm-mono hover-underline inline-flex items-center gap-1"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="pt-8 border-t border-gray-800">
        <div className="space-y-4">
          <h3 className="text-lg-mono font-medium">Stay Updated</h3>
          <p className="text-base-mono text-gray-300">
            Get notified when I publish new articles about technology, development, and startup insights.
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-2 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:border-white focus:outline-none font-mono"
            />
            <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors font-mono">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thoughts; 