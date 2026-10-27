// Temporary static list. In the Supabase phase this is loaded from `couple_photoshoot_photos`
// (admin-managed order, captions, published flag, featured flag).
export type Photo = { id: string; src: string; width: number; height: number; alt: string; caption?: string; category?: string };

export const PRENUP_PHOTOS: Photo[] = [
  { id: "p1", src: "/images/prenup-01.jpg", width: 1024, height: 1538, alt: "James and Tricia walking hand in hand on the beach at sunset with their dog" },
  { id: "p2", src: "/images/prenup-02.jpg", width: 1024, height: 1538, alt: "James twirling Tricia on the beach at golden hour" },
  { id: "p3", src: "/images/prenup-03.jpg", width: 1024, height: 1536, alt: "James and Tricia in black outfits and sunglasses, holding hands" },
  { id: "p4", src: "/images/prenup-04.jpg", width: 1024, height: 1536, alt: "James and Tricia embracing as Tricia shows her ring" },
];
export const FEATURED_PHOTO_ID = "p2";
