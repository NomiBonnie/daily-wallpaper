export interface Wallpaper {
  id: string;
  date: string; // YYYY-MM-DD
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  photographer?: string;
  source?: string;
}

// 示例数据 - 实际使用时应该从 API 或数据库加载
export const wallpapers: Wallpaper[] = [
  {
    id: '1',
    date: '2026-02-10',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    title: '雪山日出',
    description: '壮丽的雪山在清晨的阳光下闪耀',
    photographer: 'John Doe',
    source: 'Unsplash'
  },
  {
    id: '2',
    date: '2026-02-09',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    title: '海边落日',
    description: '平静的海面映照着金色的夕阳',
    photographer: 'Jane Smith',
    source: 'Unsplash'
  },
  {
    id: '3',
    date: '2026-02-08',
    imageUrl: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&q=80',
    title: '森林晨雾',
    description: '神秘的雾气笼罩着幽静的森林',
    photographer: 'Mike Wilson',
    source: 'Unsplash'
  },
  {
    id: '4',
    date: '2026-02-07',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    title: '湖光山色',
    description: '宁静的湖面倒映着远处的群山',
    photographer: 'Sarah Lee',
    source: 'Unsplash'
  },
  {
    id: '5',
    date: '2026-02-06',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    title: '林间小径',
    description: '阳光穿透树叶洒在森林小路上',
    photographer: 'Tom Brown',
    source: 'Unsplash'
  }
];

export const getWallpaperByDate = (date: Date): Wallpaper | undefined => {
  const dateString = date.toISOString().split('T')[0];
  return wallpapers.find(w => w.date === dateString);
};

export const getTodayWallpaper = (): Wallpaper | undefined => {
  return getWallpaperByDate(new Date());
};

export const getAllDatesWithWallpapers = (): string[] => {
  return wallpapers.map(w => w.date);
};
