import Link from "next/link";

export interface FooterLinkSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterSocialLink {
  platform: "twitter" | "instagram" | "linkedin" | "facebook" | "youtube" | "tiktok";
  href: string;
  label?: string;
}

export interface FooterContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  hours?: { days: string; time: string }[];
}

export interface FooterProps {
  brand: {
    name: string;
    logo?: React.ReactNode;
    description?: string;
    founded?: string | number;
  };
  linkSections?: FooterLinkSection[];
  socialLinks?: FooterSocialLink[];
  contact?: FooterContactInfo;
  bottomLinks?: Array<{ label: string; href: string }>;
  copyright?: string;
  tagline?: string;
  className?: string;
}

const socialLabelMap: Record<FooterSocialLink["platform"], string> = {
  twitter: "X",
  instagram: "IG",
  linkedin: "IN",
  facebook: "FB",
  youtube: "YT",
  tiktok: "TT",
};

export function Footer({
  brand,
  linkSections = [],
  socialLinks = [],
  contact,
  bottomLinks = [],
  copyright,
  tagline,
  className = "",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={className}
      style={{
        backgroundColor: "#141414",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.88)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-12">
          <div>
            {brand.logo ? (
              <div className="mb-4">{brand.logo}</div>
            ) : (
              <div
                className="mb-4 font-semibold uppercase tracking-wide text-white"
                style={{ fontSize: "1.5rem" }}
              >
                {brand.name}
              </div>
            )}
            {brand.description && (
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {brand.description}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex h-10 w-10 items-center justify-center text-xs font-semibold tracking-wider transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {social.label || socialLabelMap[social.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h4
                className="mb-4 text-xl font-semibold uppercase tracking-wider text-white"
                style={{ lineHeight: 0.95 }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {contact && (
            <div>
              <h4
                className="mb-4 text-xl font-semibold uppercase tracking-wider text-white"
                style={{ lineHeight: 0.95 }}
              >
                Contact
              </h4>
              <div className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="block transition-colors hover:text-white"
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="block transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                )}
                {contact.address && <p>{contact.address}</p>}
                {contact.hours && contact.hours.length > 0 && (
                  <div
                    className="mt-4 pt-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <p
                      className="mb-1 text-xs uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Hours
                    </p>
                    {contact.hours.map((h, i) => (
                      <p key={i}>
                        {h.days}: {h.time}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 py-4 text-xs md:flex-row"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <p>{copyright || `© ${currentYear} ${brand.name}. All rights reserved.`}</p>
          {tagline ? (
            <p>{tagline}</p>
          ) : brand.founded ? (
            <p>Since {brand.founded}</p>
          ) : null}
          {bottomLinks.length > 0 && (
            <div className="flex gap-4">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
