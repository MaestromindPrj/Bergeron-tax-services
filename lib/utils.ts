import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToContactForm(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  if (typeof window !== "undefined") {
    if (window.location.pathname === "/") {
      const formCard = document.getElementById("contact-form");
      const section = document.getElementById("contact");
      const target = formCard || section;

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          const input = document.getElementById("fullName");
          if (input) {
            input.focus({ preventScroll: true });
          }
        }, 500);
        return;
      }
    }

    // If not on homepage or element not found, navigate to /#contact-form
    window.location.href = "/#contact-form";
  }
}

