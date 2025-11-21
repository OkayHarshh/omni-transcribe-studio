import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Languages, Mic, Brain, TrendingUp, Activity } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "OCR Processed",
      value: "0",
      change: "+0%",
      icon: FileText,
      gradient: "from-primary to-primary-light",
    },
    {
      title: "Translations",
      value: "0",
      change: "+0%",
      icon: Languages,
      gradient: "from-secondary to-secondary-light",
    },
    {
      title: "Audio Processed",
      value: "0",
      change: "+0%",
      icon: Mic,
      gradient: "from-accent to-accent-light",
    },
    {
      title: "Sentiment Analyses",
      value: "0",
      change: "+0%",
      icon: Brain,
      gradient: "from-primary-light to-secondary",
    },
  ];

  const recentActivity = [
    {
      action: "Welcome to LinguaFlow",
      description: "Start by uploading a file or audio to any tool",
      time: "Just now",
      type: "info",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome to your AI-powered language processing platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-2`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-secondary" />
                <span className="text-secondary font-medium">{stat.change}</span>
                <span>from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest processing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-primary">Quick Start Guide</CardTitle>
            <CardDescription>Get started with LinguaFlow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </div>
              <p className="text-sm">Choose a tool from the sidebar</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </div>
              <p className="text-sm">Upload your file or audio</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </div>
              <p className="text-sm">Get instant AI-powered results</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-secondary">Supported Languages</CardTitle>
            <CardDescription>Currently available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm">Nepali</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm">Sinhala</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm">English</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-accent">AI Models</CardTitle>
            <CardDescription>Powered by leading AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• EasyOCR & Tesseract for text recognition</p>
            <p>• MarianMT & NLLB for translation</p>
            <p>• Whisper for speech processing</p>
            <p>• DistilBERT for sentiment analysis</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
