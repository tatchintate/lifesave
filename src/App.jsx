
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import './Styles.css'

function App() {

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
export default App
