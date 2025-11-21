import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PrintedOCR() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult("");
    }
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an image or PDF file first.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    // Placeholder for OCR processing
    setTimeout(() => {
      setResult("Sample OCR output will appear here once the backend is connected.");
      setProcessing(false);
      toast({
        title: "Processing complete",
        description: "Text extracted successfully!",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Printed OCR
        </h1>
        <p className="text-muted-foreground">
          Extract text from printed documents in Nepali and Sinhala using advanced OCR
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Document
            </CardTitle>
            <CardDescription>
              Supports images (PNG, JPG) and PDF files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-all border-border hover:border-primary">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-12 h-12 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or PDF (MAX. 10MB)</p>
                  {file && (
                    <p className="mt-2 text-sm font-medium text-primary">{file.name}</p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
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
                  Processing...
                </>
              ) : (
                "Extract Text"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" />
              Extracted Text
            </CardTitle>
            <CardDescription>
              OCR results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-4">
              {result ? (
                <p className="text-sm font-mono whitespace-pre-wrap">{result}</p>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-20">
                  Upload and process a document to see extracted text
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-primary">About Printed OCR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Uses EasyOCR, Tesseract, and PaddleOCR for high accuracy</p>
          <p>• Supports Nepali and Sinhala scripts</p>
          <p>• Handles printed text, tables, and formatted documents</p>
          <p>• Works with images and multi-page PDFs</p>
        </CardContent>
      </Card>
    </div>
  );
}
