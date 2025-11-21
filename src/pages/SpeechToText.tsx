import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Mic, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpeechToText() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setTranscript("");
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
      setTranscript("Sample transcription will appear here once the backend is connected.");
      setProcessing(false);
      toast({
        title: "Transcription complete",
        description: "Audio converted to text successfully!",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Speech to Text
        </h1>
        <p className="text-muted-foreground">
          Convert Nepali and Sinhala audio to text using Whisper ASR
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Audio
            </CardTitle>
            <CardDescription>
              Supports MP3, WAV, M4A, and other audio formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-all border-border hover:border-primary">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Mic className="w-12 h-12 mb-3 text-muted-foreground" />
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
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transcribing...
                </>
              ) : (
                "Transcribe Audio"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-secondary" />
              Transcript
            </CardTitle>
            <CardDescription>
              Transcribed text will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-4">
              {transcript ? (
                <p className="text-sm whitespace-pre-wrap">{transcript}</p>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-20">
                  Upload and process audio to see transcription
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-primary">About Speech to Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by OpenAI Whisper ASR model</p>
          <p>• Supports Nepali and Sinhala speech</p>
          <p>• High accuracy transcription</p>
          <p>• Handles various audio formats and quality</p>
        </CardContent>
      </Card>
    </div>
  );
}
