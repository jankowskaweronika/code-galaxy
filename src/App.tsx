import { CourseCard } from './components/CourseCard/index'
import logo from './assets/logo.png'

function App() {
  return (
    <div>
      <CourseCard image={logo} name={'CodeRoad Course'} price={79} description={'Juz teraz zapraszamy Cię do skorzystania z naszego kursu, który przygotuje Cię do pierwszej pracy jako programista!'} />
    </div>
  )
}

export default App
