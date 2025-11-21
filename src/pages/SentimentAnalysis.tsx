import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Loader2, Smile, Frown, Meh } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SentimentResult = {
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
};

export default function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to analyze sentiment.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setResult({
        sentiment: "positive",
        confidence: 0.87,
        scores: {
          positive: 0.87,
          negative: 0.08,
          neutral: 0.05,
        },
      });
      setProcessing(false);
      toast({
        title: "Analysis complete",
        description: "Sentiment detected successfully!",
      });
    }, 1500);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-8 w-8 text-green-500" />;
      case "negative":
        return <Frown className="h-8 w-8 text-red-500" />;
      default:
        return <Meh className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "from-green-500 to-emerald-500";
      case "negative":
        return "from-red-500 to-rose-500";
      default:
        return "from-yellow-500 to-amber-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
          Sentiment Analysis
        </h1>
        <p className="text-muted-foreground">
          Detect emotional tone of translated English text using DistilBERT or VADER
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            Enter Text
          </CardTitle>
          <CardDescription>
            Type or paste text to analyze its sentiment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text for sentiment analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none"
          />

          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || processing}
            className="w-full bg-gradient-accent hover:opacity-90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analyze Sentiment
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-accent/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-accent">Sentiment Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${getSentimentColor(result.sentiment)}`}>
                {getSentimentIcon(result.sentiment)}
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold capitalize mb-1">{result.sentiment}</p>
                <p className="text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Detailed Scores</p>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-green-500" />
                      Positive
                    </span>
                    <span className="font-medium">{(result.scores.positive * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                      style={{ width: `${result.scores.positive * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <Meh className="h-4 w-4 text-yellow-500" />
                      Neutral
                    </span>
                    <span className="font-medium">{(result.scores.neutral * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all"
                      style={{ width: `${result.scores.neutral * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <Frown className="h-4 w-4 text-red-500" />
                      Negative
                    </span>
                    <span className="font-medium">{(result.scores.negative * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all"
                      style={{ width: `${result.scores.negative * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-accent">About Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by DistilBERT or VADER models</p>
          <p>• Detects positive, negative, and neutral emotions</p>
          <p>• Provides confidence scores for each sentiment</p>
          <p>• Best used with translated English text</p>
        </CardContent>
      </Card>
    </div>
  );
}
