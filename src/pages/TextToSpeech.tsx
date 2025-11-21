import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AudioLines, Play, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("en-US");
  const [processing, setProcessing] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setAudioGenerated(true);
      setProcessing(false);
      toast({
        title: "Audio generated",
        description: "Text converted to speech successfully!",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
          Text to Speech
        </h1>
        <p className="text-muted-foreground">
          Convert English text to natural-sounding speech using EdgeTTS or Coqui TTS
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AudioLines className="h-5 w-5 text-accent" />
            Enter Text
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Type or paste text to convert to speech</span>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="en-AU">English (AU)</SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none"
          />

          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || processing}
            className="w-full bg-gradient-accent hover:opacity-90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Speech"
            )}
          </Button>
        </CardContent>
      </Card>

      {audioGenerated && (
        <Card className="border-accent/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-accent">Generated Audio</CardTitle>
            <CardDescription>Your speech is ready</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-accent">
                <AudioLines className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Audio Generated</p>
                <p className="text-sm text-muted-foreground">Ready to play or download</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-accent hover:opacity-90">
                <Play className="mr-2 h-4 w-4" />
                Play Audio
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-accent">About Text to Speech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by EdgeTTS or Coqui TTS engines</p>
          <p>• Generates natural-sounding English speech</p>
          <p>• Multiple voice options available</p>
          <p>• High-quality audio output</p>
        </CardContent>
      </Card>
    </div>
  );
}
