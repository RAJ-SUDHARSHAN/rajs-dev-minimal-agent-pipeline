import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { colors } from "@/constants/colors";
import profile from "~/images/profile.jpg";

const ProfileHeader = () => {
  return (
    <header className="mb-16">
      {/* Profile section with image and name and social links */}
      <Image
        src={profile}
        alt="Profile Picture"
        width={100}
        height={100}
        className={`rounded-full w-20 h-20 border transition-all duration-300 mb-6`}
      />

      {/* Name and social links */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-4">
          <div>
            <h1
              className={`text-3xl font-normal ${colors.text.primary} ${colors.text.hover} transition-colors tracking-tight`}
            >
              Raj Sudharshan
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="https://github.com/raj-sudharshan"
            target="_blank"
            className={`bg-white rounded-md p-1 ${colors.background.hoverLink} transition-colors duration-300`}
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4 text-black" />
          </Link>
          <Link
            href="https://linkedin.com/in/sudharshann05"
            target="_blank"
            className={`bg-white rounded-md p-1 ${colors.background.hoverLink} transition-colors duration-300`}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>

      {/* Role/title */}
      <p className={`${colors.text.secondary} text-lg mb-5`}>
        Software Engineer
      </p>

      {/* Divider */}
      <div className={`h-px w-full ${colors.divider.primary}`} />
    </header>
  );
};

export default ProfileHeader;
