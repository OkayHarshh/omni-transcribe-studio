import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Captions, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SubtitleGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [subtitles, setSubtitles] = useState<string>("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSubtitles("");
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an audio or video file first.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setSubtitles(`1
00:00:00,000 --> 00:00:03,000
Sample subtitle line 1

2
00:00:03,000 --> 00:00:06,000
Sample subtitle line 2

3
00:00:06,000 --> 00:00:09,000
Sample subtitle line 3`);
      setProcessing(false);
      toast({
        title: "Subtitles generated",
        description: "SRT file is ready to download!",
      });
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Subtitle Generator
        </h1>
        <p className="text-muted-foreground">
          Generate SRT subtitles from Nepali and Sinhala audio using Whisper
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Media
            </CardTitle>
            <CardDescription>
              Supports audio and video files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-all border-border hover:border-primary">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Captions className="w-12 h-12 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">MP3, WAV, MP4, AVI (MAX. 50MB)</p>
                  {file && (
                    <p className="mt-2 text-sm font-medium text-primary">{file.name}</p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="audio/*,video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!file || processing}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Subtitles...
                </>
              ) : (
                "Generate SRT"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Captions className="h-5 w-5 text-secondary" />
              Subtitle Preview
            </CardTitle>
            <CardDescription>
              SRT format preview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-4">
              {subtitles ? (
                <pre className="text-xs font-mono whitespace-pre-wrap">{subtitles}</pre>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-20">
                  Upload and process media to generate subtitles
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {subtitles && (
        <Card className="border-secondary/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-secondary">Download Subtitles</CardTitle>
            <CardDescription>Export as SRT file</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-gradient-secondary hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Download SRT File
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-primary">About Subtitle Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Powered by Whisper ASR with timestamp extraction</p>
          <p>• Generates industry-standard SRT format</p>
          <p>• Automatic timing and segmentation</p>
          <p>• Works with both audio and video files</p>
        </CardContent>
      </Card>
    </div>
  );
}
