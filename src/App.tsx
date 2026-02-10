import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { wallpapers, type Wallpaper } from './data'
import { Moon, Sun } from 'lucide-react'

type View = 'today' | 'calendar'

function App() {
  const [view, setView] = useState<View>('today')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [darkMode, setDarkMode] = useState(false)

  // Check system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const todayWallpaper = wallpapers.find(
    (w) => format(new Date(w.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ) || wallpapers[wallpapers.length - 1]

  const selectedWallpaper = wallpapers.find(
    (w) => format(new Date(w.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  const hasWallpaper = (date: Date) => {
    return wallpapers.some(
      (w) => format(new Date(w.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light tracking-wide text-neutral-900 dark:text-neutral-100">
              DAILY WALLPAPER
            </h1>
            
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-neutral-400" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-600" />
                )}
              </button>

              {/* View Toggle */}
              <nav className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1">
                <button
                  onClick={() => setView('today')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-wide transition-all ${
                    view === 'today'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-wide transition-all ${
                    view === 'calendar'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Archive
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 sm:px-8">
        {view === 'today' ? (
          /* Today View */
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Image */}
              <div className="lg:col-span-8">
                <div className="aspect-[9/16] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-2xl">
                  <img
                    src={todayWallpaper.imageUrl}
                    alt={todayWallpaper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-4 space-y-8 lg:pt-8">
                <div className="space-y-6">
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                    {format(new Date(todayWallpaper.date), 'MMMM dd, yyyy')}
                  </p>
                  
                  <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                    {todayWallpaper.title}
                  </h2>
                  
                  {todayWallpaper.description && (
                    <p className="text-base font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {todayWallpaper.description}
                    </p>
                  )}

                  {todayWallpaper.photographer && (
                    <p className="text-sm font-light text-neutral-500 dark:text-neutral-500">
                      Photo by {todayWallpaper.photographer}
                    </p>
                  )}
                </div>

                <a
                  href={todayWallpaper.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto px-12 py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-light tracking-wider uppercase rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300 text-center"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Calendar View */
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Calendar */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-neutral-200 dark:border-neutral-800">
                  <Calendar
                    onChange={handleDateClick}
                    value={selectedDate}
                    locale="en-US"
                    tileClassName={({ date }) =>
                      hasWallpaper(date)
                        ? 'wallpaper-date'
                        : ''
                    }
                    className="luxury-calendar"
                  />
                </div>
              </div>

              {/* Selected Wallpaper Preview */}
              <div className="lg:col-span-5">
                {selectedWallpaper ? (
                  <div className="space-y-6 lg:sticky lg:top-24">
                    <div className="aspect-[9/16] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-2xl">
                      <img
                        src={selectedWallpaper.thumbnailUrl || selectedWallpaper.imageUrl}
                        alt={selectedWallpaper.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4 px-2">
                      <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                        {format(new Date(selectedWallpaper.date), 'MMMM dd, yyyy')}
                      </p>
                      
                      <h3 className="text-2xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
                        {selectedWallpaper.title}
                      </h3>

                      <a
                        href={selectedWallpaper.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full px-10 py-3.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-light tracking-wider uppercase rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300 text-center"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-neutral-400 dark:text-neutral-600 font-light">
                    No wallpaper available for this date
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
