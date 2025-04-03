import { Routes, Route } from 'react-router';
import BeginnersGuide from './blogs/1_beginners_guide';
import Benefits from './blogs/2_benefits';

export default function Blogs() {
    return (
        <Routes>
            <Route path="beginners-guide" element={<BeginnersGuide />} />
            <Route path="benefits" element={<Benefits />} />
        </Routes>
    )
}
