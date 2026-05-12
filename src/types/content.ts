export type FeaturedProject = {
  /** Display heading for accessibility ("Theory Verse") */
  title: string;
  /** Visible parts — split into left/right halves around the hover image */
  parts: [string, string?];
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};

export type ListLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type StoreProduct = {
  title: string;
  price: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};
