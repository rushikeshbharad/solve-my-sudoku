import { Routes, Route } from 'react-router'
import BeginnersGuide from './blogs/1_beginners_guide'
import Benefits from './blogs/2_benefits'
import History from './blogs/3_history'

export default function Blogs() {
    return (
        <Routes>
            <Route path="/beginners-guide" element={<BeginnersGuide />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/history" element={<History />} />
        </Routes>
    )
}
