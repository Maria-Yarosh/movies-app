import { Routing } from '@/common/routing'
import { Header } from '@/common/components/Header/Header'
import s from './App.module.css'
import { useAppSelector, useGlobalLoading } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/appSlice'
import { useEffect } from 'react'
import { Footer } from '@/common/components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  const isGlobalLoading = useGlobalLoading()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
  }, [themeMode])

  return (
    <div className={s.app}>
      <Header />
      {isGlobalLoading && <LinearProgress />}

      <main className={s.layout}>
        <SkeletonTheme
          baseColor={themeMode === 'dark' ? '#30383e' : '#e1e5e9'}
          highlightColor={themeMode === 'dark' ? '#465159' : '#f5f7f9'}
        >
          <Routing />
        </SkeletonTheme>
      </main>

      <Footer />

      <ToastContainer />
    </div>
  )
}

export default App
