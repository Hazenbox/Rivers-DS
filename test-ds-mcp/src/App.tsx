import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ButtonShowcase } from './pages/ButtonShowcase';
import { TokensOverview } from './pages/TokensOverview';
import { ColorTokens } from './pages/ColorTokens';
import { SpacingTokens } from './pages/SpacingTokens';
import { TypographyTokens } from './pages/TypographyTokens';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/button" replace />} />
          <Route path="button" element={<ButtonShowcase />} />
          <Route path="tokens" element={<TokensOverview />} />
          <Route path="tokens/colors" element={<ColorTokens />} />
          <Route path="tokens/spacing" element={<SpacingTokens />} />
          <Route path="tokens/typography" element={<TypographyTokens />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
