'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, GraduationCap } from 'lucide-react';
import { assetPath } from '@/lib/paths';
import type { SiteConfig } from '@/lib/config';

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  researchInterests?: string[];
}

// Adapted from PRISM's configuration-driven profile component.
export default function Profile({ author, social, researchInterests }: ProfileProps) {
  return (
    <div className="prism-profile">
      <div className="profile-image">
        <Image src={assetPath(author.avatar)} alt={`Portrait placeholder for ${author.name}`} width={224} height={224} priority />
      </div>
      <div className="profile-heading">
        <h2>{author.name}</h2>
        <p className="profile-role">{author.title}</p>
        {author.department && <p>{author.department}</p>}
        <p><a href={author.institution_url}>{author.institution}</a></p>
      </div>
      <ul className="profile-links">
        {social.location && <li><MapPin aria-hidden="true" /><span>{social.location}</span></li>}
        {social.email && <li><a href={`mailto:${social.email}`}><Mail aria-hidden="true" /><span>Email</span></a></li>}
        {social.github && <li><a href={social.github} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /><span>GitHub</span></a></li>}
        {social.google_scholar && <li><a href={social.google_scholar}><GraduationCap aria-hidden="true" /><span>Google Scholar</span></a></li>}
        {social.linkedin && <li><a href={social.linkedin}><Linkedin aria-hidden="true" /><span>LinkedIn</span></a></li>}
      </ul>
      {researchInterests && <div className="profile-interests">
        <h3 className="section-eyebrow">interests</h3>
        <ul>{researchInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
      </div>}
      <Link className="profile-cv" href="/cv/">Curriculum vitae <ArrowUpRight aria-hidden="true" /></Link>
    </div>
  );
}
