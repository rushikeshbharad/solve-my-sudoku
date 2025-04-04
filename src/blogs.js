import { Routes, Route } from 'react-router'
import BeginnersGuide from './blogs/1_beginners_guide'
import Benefits from './blogs/2_benefits'
import History from './blogs/3_history'
import AdvancedTechniques from './blogs/4_advanced_techniques'
import CreateYourOwn from './blogs/5_create_your_own'

export default function Blogs() {
    return (
        <Routes>
            <Route path="/beginners-guide" element={<BeginnersGuide />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/history" element={<History />} />
            <Route path="/advanced-techniques" element={<AdvancedTechniques />} />
            <Route path="/create-your-own" element={<CreateYourOwn />} />
        </Routes>
    )
}
