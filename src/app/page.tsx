import ProfileHeader from "../components/ProfileHeader";
import { about, experiences, projects } from "../data/content";
import { tools } from "../data/skills";
import { colors } from "@/constants/colors";
import { FiArrowUpRight } from "react-icons/fi";
// import { FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { BsCalendarWeek } from "react-icons/bs";

const HomePage = () => {
  return (
    <main
      className={`min-h-screen ${colors.background.primary} font-['Inter']`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <ProfileHeader />

        {/* About Section */}
        <section className="mb-16">
          <h2
            className={`text-2xl font-normal mb-6 ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
          >
            About me
          </h2>

          {/* Divider */}
          <div className={`my-5 h-px w-full ${colors.divider.primary}`} />

          <p className={`${colors.text.secondary} leading-relaxed text-lg`}>
            {about.content}
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2
            className={`text-2xl font-normal mb-6 ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
          >
            Experience
          </h2>

          {/* Divider */}
          <div className={`my-5 h-px w-full ${colors.divider.primary}`} />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6">
                  <div
                    className={`${colors.text.tertiary} space-y-1 md:space-y-0`}
                  >
                    {exp.period.split("—").map((date, i) => (
                      <div key={i}>{date.trim()}</div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-normal ${colors.text.primary} ${colors.text.groupHover} transition-colors tracking-tight`}
                    >
                      {exp.title}
                    </h3>
                    <p className={`${colors.text.secondary} leading-relaxed`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What I Use Section */}
        <section className="mb-16">
          <h2
            className={`text-2xl font-normal mb-6 ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
          >
            What I use
          </h2>

          {/* Divider */}
          <div className={`my-5 h-px w-full ${colors.divider.primary}`} />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${colors.background.secondary} border border-black ${colors.border.hover} flex items-center justify-center ${colors.text.groupHover}`}
                >
                  <tool.icon
                    className={`w-6 h-6 ${colors.text.primary} ${colors.text.groupHover} transition-colors`}
                  />
                </div>
                <span
                  className={`text-sm text-center ${colors.text.secondary} ${colors.text.groupHover} transition-colors`}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2
            className={`text-2xl font-normal mb-6 ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
          >
            What I build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((project, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                href={project.link}
                className="block group"
                aria-label={`View project: ${project.title}`}
              >
                <article
                  className={`rounded-lg ${colors.background.secondary} border ${colors.border.primary} p-6 ${colors.border.hover} transition-all duration-300 h-full`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xl font-normal ${colors.text.primary} ${colors.text.groupHover} transition-colors tracking-tight`}
                    >
                      {project.title}
                    </h3>
                    <FiArrowUpRight
                      className={`w-4 h-4 ${colors.text.tertiary} ${colors.text.groupHover} transition-colors`}
                      aria-hidden="true"
                    />
                  </div>
                  {/* Divider */}
                  <div
                    className={`mt-2 mb-4 h-px w-full ${colors.divider.primary}`}
                    role="presentation"
                  />
                  <p className={`${colors.text.secondary} leading-relaxed`}>
                    {project.description}
                  </p>
                </article>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2
            className={`text-2xl font-normal mb-6 ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
          >
            Contact
          </h2>

          {/* Divider */}
          <div className={`my-5 h-px w-full ${colors.divider.primary}`} />

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:sudharshann05@gmail.com"
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full ${colors.background.secondary} ${colors.text.primary} ${colors.text.hover} border ${colors.border.primary} ${colors.border.hover} transition-colors w-full sm:w-auto`}
            >
              <HiMail className="w-5 h-5" />
              <span>Send Email</span>
            </a>
            <a
              href="https://cal.com/raj-sudharshan"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full ${colors.background.secondary} ${colors.text.primary} ${colors.text.hover} border ${colors.border.primary} ${colors.border.hover} transition-colors w-full sm:w-auto`}
            >
              <BsCalendarWeek className="w-5 h-5" />
              <span>Book Call</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#333333]">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
            <p className={`${colors.text.tertiary} ${colors.text.hover}`}>
              Less, but better.
            </p>
            <p className={`${colors.text.tertiary} ${colors.text.hover}`}>
              © {new Date().getFullYear()} Raj Sudharshan
            </p>
            <a
              href="/privacy"
              className={`${colors.text.tertiary} ${colors.text.hover} transition-colors`}
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
