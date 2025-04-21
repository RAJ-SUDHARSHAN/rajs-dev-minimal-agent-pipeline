import { colors } from "@/constants/colors";

export default function PrivacyPolicy() {
  return (
    <main
      className={`min-h-screen ${colors.background.primary} font-['Inter']`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1
          className={`text-3xl font-normal mb-8 ${colors.text.primary} ${colors.text.hover}`}
        >
          Privacy Policy
        </h1>

        <div className="space-y-8">
          <section>
            <p className={`${colors.text.secondary} leading-relaxed`}>
              This is my personal website, and I use cookies and similar
              technologies to understand who visits my site. This helps me learn
              about my audience and improve my content. I do not use this
              information for marketing or any other purposes.
            </p>
          </section>

          <section>
            <h2
              className={`text-2xl font-normal mb-4 ${colors.text.primary} ${colors.text.hover}`}
            >
              Your Choices
            </h2>
            <p className={`${colors.text.secondary} leading-relaxed`}>
              You may opt out of data collection by visiting{" "}
              <a
                href="https://app.retention.com/optout"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.text.primary} ${colors.text.hover} underline`}
              >
                https://app.retention.com/optout
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
