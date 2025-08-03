// src/react-app/SocialLinks.tsx
import './SocialLinks.css';

interface SocialLinksProps {
  links: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className="content-social-links">
      {links.facebook && <a href={links.facebook} target="_blank" rel="noopener noreferrer">FB</a>}
      {links.twitter && <a href={links.twitter} target="_blank" rel="noopener noreferrer">TW</a>}
      {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer">YT</a>}
      {links.tiktok && <a href={links.tiktok} target="_blank" rel="noopener noreferrer">TT</a>}
    </div>
  );
};