import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import PrintedOCR from "./pages/PrintedOCR";
import HandwrittenOCR from "./pages/HandwrittenOCR";
import Translate from "./pages/Translate";
import DetectLanguage from "./pages/DetectLanguage";
import SpeechToText from "./pages/SpeechToText";
import SpeechTranslator from "./pages/SpeechTranslator";
import TextToSpeech from "./pages/TextToSpeech";
import SubtitleGenerator from "./pages/SubtitleGenerator";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/ocr/printed" element={<MainLayout><PrintedOCR /></MainLayout>} />
          <Route path="/ocr/handwritten" element={<MainLayout><HandwrittenOCR /></MainLayout>} />
          <Route path="/translate" element={<MainLayout><Translate /></MainLayout>} />
          <Route path="/detect-language" element={<MainLayout><DetectLanguage /></MainLayout>} />
          <Route path="/speech/to-text" element={<MainLayout><SpeechToText /></MainLayout>} />
          <Route path="/speech/translator" element={<MainLayout><SpeechTranslator /></MainLayout>} />
          <Route path="/speech/text-to-speech" element={<MainLayout><TextToSpeech /></MainLayout>} />
          <Route path="/speech/subtitles" element={<MainLayout><SubtitleGenerator /></MainLayout>} />
          <Route path="/sentiment" element={<MainLayout><SentimentAnalysis /></MainLayout>} />
          <Route path="/history" element={<MainLayout><History /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
