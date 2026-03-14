import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 py-8 mt-20 z-10 relative bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-foreground/60 mb-4 md:mb-0">
                    © {currentYear} Dheeraj Prajapat. All rights reserved.
                </p>

                <div className="flex space-x-6">
                    <a
                        href="https://github.com/iamdheeraj22"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary-500 transition-colors"
                    >
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://linkedin.com/in/iamdheeraj24"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-primary-500 transition-colors"
                    >
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                        href="mailto:dheerajprajapati334@gmail.com"
                        className="text-foreground/60 hover:text-primary-500 transition-colors"
                    >
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
