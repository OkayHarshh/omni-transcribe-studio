import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AudioLines, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpeechTranslator() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ transcript: string; translation: string } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setResult({
        transcript: "Sample transcript in source language",
        translation: "Sample English translation will appear here",
      });
      setProcessing(false);
      toast({
        title: "Translation complete",
        description: "Speech translated and converted to audio!",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
          Speech Translator
        </h1>
        <p className="text-muted-foreground">
          Convert speech to English speech through transcription and translation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Audio
          </CardTitle>
          <CardDescription>
            Upload Nepali or Sinhala audio to translate to English speech
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-all border-border hover:border-primary">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AudioLines className="w-12 h-12 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">MP3, WAV, M4A (MAX. 25MB)</p>
                {file && (
                  <p className="mt-2 text-sm font-medium text-primary">{file.name}</p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <Button
            onClick={handleProcess}
            disabled={!file || processing}
            className="w-full bg-gradient-secondary hover:opacity-90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Pipeline...
              </>
            ) : (
              "Translate Speech"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 lg:grid-cols-2 animate-scale-in">
          <Card>
            <CardHeader>
              <CardTitle>Original Transcript</CardTitle>
              <CardDescription>Transcribed from source audio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{result.transcript}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>English Translation</CardTitle>
              <CardDescription>Translated text</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{result.translation}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && (
        <Card className="border-secondary/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AudioLines className="h-5 w-5 text-secondary" />
              English Audio Output
            </CardTitle>
            <CardDescription>Download translated speech</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-gradient-secondary hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Download English Audio
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-secondary">About Speech Translator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Three-stage pipeline: Speech → Text → Translation → Speech</p>
          <p>• Uses Whisper for transcription, MarianMT for translation</p>
          <p>• EdgeTTS or Coqui for English audio generation</p>
          <p>• Maintains natural speech patterns</p>
        </CardContent>
      </Card>
    </div>
  );
}
