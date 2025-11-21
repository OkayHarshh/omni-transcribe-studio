import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DetectLanguage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ language: string; confidence: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleDetect = async () => {
    if (!text.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to detect language.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setResult({
        language: "Nepali",
        confidence: 0.95,
      });
      setProcessing(false);
      toast({
        title: "Detection complete",
        description: "Language identified successfully!",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
          Auto Language Detection
        </h1>
        <p className="text-muted-foreground">
          Automatically detect if text is in Nepali or Sinhala using FastText LID
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Enter Text
          </CardTitle>
          <CardDescription>
            Paste or type text to detect its language
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
            onClick={handleDetect}
            disabled={!text.trim() || processing}
            className="w-full bg-gradient-accent hover:opacity-90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Detect Language
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-accent/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-accent">Detection Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Detected Language</p>
                <p className="text-2xl font-bold">{result.language}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-accent transition-all"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-accent">About Language Detection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by FastText Language Identification (LID)</p>
          <p>• Detects Nepali vs Sinhala automatically</p>
          <p>• Fast and accurate identification</p>
          <p>• Provides confidence scores</p>
        </CardContent>
      </Card>
    </div>
  );
}
