import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, FileText, Languages, Mic, Brain } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function History() {
  // Placeholder data
  const historyItems = [
    {
      id: 1,
      type: "OCR",
      action: "Printed text extraction",
      filename: "document.pdf",
      date: "2024-01-15",
      time: "14:32",
      icon: FileText,
    },
    {
      id: 2,
      type: "Translation",
      action: "Nepali to English",
      filename: "sample_text.txt",
      date: "2024-01-15",
      time: "13:15",
      icon: Languages,
    },
    {
      id: 3,
      type: "Speech",
      action: "Speech to text",
      filename: "audio_recording.mp3",
      date: "2024-01-14",
      time: "16:45",
      icon: Mic,
    },
    {
      id: 4,
      type: "Analysis",
      action: "Sentiment analysis",
      filename: "feedback.txt",
      date: "2024-01-14",
      time: "11:20",
      icon: Brain,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          History
        </h1>
        <p className="text-muted-foreground">
          View your past OCR, translation, speech, and analysis activities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-primary" />
            Activity Log
          </CardTitle>
          <CardDescription>
            All your processing history in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.filename}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {historyItems.length === 0 && (
            <div className="text-center py-12">
              <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No activity yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start using tools to see your history here
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-primary">Export History</CardTitle>
            <CardDescription>Download your activity log</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Coming soon: Export your history as CSV or JSON
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-secondary">Filter & Search</CardTitle>
            <CardDescription>Find specific activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Coming soon: Advanced filtering and search
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-accent">Statistics</CardTitle>
            <CardDescription>Your usage insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Coming soon: Detailed usage statistics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
