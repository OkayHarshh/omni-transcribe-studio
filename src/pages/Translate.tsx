import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Languages, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Translate() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("ne");
  const [targetLang, setTargetLang] = useState("en");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setTranslatedText("Sample translation will appear here once the backend is connected.");
      setProcessing(false);
      toast({
        title: "Translation complete",
        description: "Text translated successfully!",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
          Translate
        </h1>
        <p className="text-muted-foreground">
          Translate text between Nepali, Sinhala, and English using MarianMT and NLLB-200
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              Source Text
            </CardTitle>
            <CardDescription>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ne">Nepali</SelectItem>
                  <SelectItem value="si">Sinhala</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-secondary" />
              Translated Text
            </CardTitle>
            <CardDescription>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ne">Nepali</SelectItem>
                  <SelectItem value="si">Sinhala</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] rounded-lg border border-border bg-muted/30 p-3">
              {translatedText ? (
                <p className="text-sm whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-20">
                  Translation will appear here
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || processing}
          size="lg"
          className="bg-gradient-secondary hover:opacity-90"
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              Translate
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-secondary">About Translation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by MarianMT and NLLB-200 models</p>
          <p>• High-quality neural machine translation</p>
          <p>• Supports bidirectional translation</p>
          <p>• Preserves context and meaning</p>
        </CardContent>
      </Card>
    </div>
  );
}
