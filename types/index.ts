export interface Ministry {
  slug: string;
  name: string;
  tagline: string;
  photo: string;
  body: string[];
}

export interface Pastor {
  name: string;
  role: string;
  photo: string;
  photoCaption: string;
  testimony: string[];
  scriptureRef: string;
}

export interface CTA {
  label: string;
  href: string;
  external?: boolean;
}
