export interface Wallpaper {
  id: string
  date: string
  imageUrl: string
  thumbnailUrl?: string
  title: string
  description?: string
  photographer?: string
  source?: string
}

export const wallpapers: Wallpaper[] = [
  {
    id: '1',
    date: '2026-02-06',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=95',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    title: 'Mountain Peak',
    description: 'Majestic alpine summit bathed in golden light',
    photographer: 'John Doe',
    source: 'Unsplash',
  },
  {
    id: '2',
    date: '2026-02-07',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&q=95',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80',
    title: 'Ocean Waves',
    description: 'Serene coastal landscape at dusk',
    photographer: 'Jane Smith',
    source: 'Unsplash',
  },
  {
    id: '3',
    date: '2026-02-08',
    imageUrl: 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=1080&q=95',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=600&q=80',
    title: 'Wildflower Meadow',
    description: 'Vibrant spring blooms in morning light',
    photographer: 'Alice Johnson',
    source: 'Unsplash',
  },
  {
    id: '4',
    date: '2026-02-09',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&q=95',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    title: 'Forest Path',
    description: 'Enchanting woodland trail through ancient trees',
    photographer: 'Bob Williams',
    source: 'Unsplash',
  },
  {
    id: '5',
    date: '2026-02-10',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&q=95',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
    title: 'Misty Mountains',
    description: 'Ethereal peaks emerging from clouds at sunrise',
    photographer: 'John Doe',
    source: 'Unsplash',
  },
]
