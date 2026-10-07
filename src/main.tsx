import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/ui/App/App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/model/store.ts'
import { FavoritesProvider } from './features/movies/model/favorites/FavoritesProvider.tsx'
import 'react-loading-skeleton/dist/skeleton.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </Provider>
  </BrowserRouter>,
)
