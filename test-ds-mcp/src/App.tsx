import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ComponentsOverview } from './pages/ComponentsOverview';
import { ButtonShowcase } from './pages/ButtonShowcase';
import { InputShowcase } from './pages/InputShowcase';
import { TextAreaShowcase } from './pages/TextAreaShowcase';
import { BadgeShowcase } from './pages/BadgeShowcase';
import { AvatarShowcase } from './pages/AvatarShowcase';
import { CardShowcase } from './pages/CardShowcase';
import { DividerShowcase } from './pages/DividerShowcase';
import { TokensOverview } from './pages/TokensOverview';
import { ColorTokens } from './pages/ColorTokens';
import { SpacingTokens } from './pages/SpacingTokens';
import { TypographyTokens } from './pages/TypographyTokens';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/components" replace />} />
          
          {/* Components Overview */}
          <Route path="components" element={<ComponentsOverview />} />
          
          {/* Form Components */}
          <Route path="button" element={<ButtonShowcase />} />
          <Route path="input" element={<InputShowcase />} />
          <Route path="textarea" element={<TextAreaShowcase />} />
          
          {/* Display Components */}
          <Route path="badge" element={<BadgeShowcase />} />
          <Route path="avatar" element={<AvatarShowcase />} />
          <Route path="card" element={<CardShowcase />} />
          <Route path="divider" element={<DividerShowcase />} />
          
          {/* Tokens */}
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
