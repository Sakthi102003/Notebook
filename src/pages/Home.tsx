import { useTheme } from '../components/features/ThemeProvider'
import StealthDashboard from './StealthDashboard'
import CorporateDashboard from './CorporateDashboard'

export default function Home() {
  const { theme } = useTheme()

  return theme === 'corporate' ? <CorporateDashboard /> : <StealthDashboard />
}
