import { useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Wallpaper, getTodayWallpaper, getWallpaperByDate, getAllDatesWithWallpapers } from './data'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function App() {
  const [view, setView] = useState<'today' | 'calendar'>('today')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | undefined>(getTodayWallpaper())

  const datesWithWallpapers = getAllDatesWithWallpapers()

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value)
      const wallpaper = getWallpaperByDate(value)
      setSelectedWallpaper(wallpaper)
      if (wallpaper) {
        setView('today')
      }
    }
  }

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split('T')[0]
    if (datesWithWallpapers.includes(dateString)) {
      return 'react-calendar__tile--hasWallpaper'
    }
    return null
  }

  const downloadWallpaper = () => {
    if (selectedWallpaper) {
      window.open(selectedWallpaper.imageUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              每日壁纸
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('today')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === 'today'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                今日壁纸
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === 'calendar'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                历史壁纸
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'today' && selectedWallpaper ? (
          <div className="space-y-6">
            {/* Wallpaper Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative aspect-[9/16] md:aspect-[16/9] max-h-[70vh]">
                <img
                  src={selectedWallpaper.imageUrl}
                  alt={selectedWallpaper.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedWallpaper.title}</h2>
                  {selectedWallpaper.description && (
                    <p className="text-lg text-white/90 mb-4">{selectedWallpaper.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {selectedWallpaper.photographer && (
                        <p>摄影师: {selectedWallpaper.photographer}</p>
                      )}
                      <p>{format(new Date(selectedWallpaper.date), 'yyyy年MM月dd日', { locale: zhCN })}</p>
                    </div>
                    <button
                      onClick={downloadWallpaper}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg"
                    >
                      下载壁纸
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>使用提示：</strong>点击"下载壁纸"在新标签页打开高清原图，然后长按保存到手机相册作为壁纸使用。
              </p>
            </div>
          </div>
        ) : view === 'today' && !selectedWallpaper ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">今天还没有壁纸</h2>
            <p className="text-gray-600">敬请期待明天的精彩壁纸！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Calendar View */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">选择日期查看壁纸</h2>
              <div className="flex justify-center">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileClassName={tileClassName}
                  locale="zh-CN"
                  maxDate={new Date()}
                />
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>蓝色背景</strong>的日期表示有壁纸可查看
                </p>
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedWallpaper && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={selectedWallpaper.thumbnailUrl}
                    alt={selectedWallpaper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{selectedWallpaper.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {format(new Date(selectedWallpaper.date), 'yyyy年MM月dd日', { locale: zhCN })}
                  </p>
                  <button
                    onClick={() => {
                      setView('today')
                    }}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all"
                  >
                    查看完整壁纸
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>每日精选高清壁纸 · 为您的手机屏幕增添美感</p>
        </div>
      </footer>
    </div>
  )
}

export default App
