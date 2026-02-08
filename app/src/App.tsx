import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage'
import OnboardingPage from './pages/OnboardingPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nxt-theme">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
