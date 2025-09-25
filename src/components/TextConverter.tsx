import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Clipboard, Trash2, Download } from 'lucide-react';

const TextConverter = () => {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('');
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      toast({
        title: "បិទភ្ជាប់បានជោគជ័យ",
        description: "អត្ថបទត្រូវបានបិទភ្ជាប់ពីក្តារតម្បៀតខ្ទាស់",
      });
    } catch (err) {
      console.error('Failed to read clipboard contents:', err);
      toast({
        title: "មិនអាចបិទភ្ជាប់បានទេ",
        description: "មិនអាចចូលប្រើក្តារតម្បៀតខ្ទាស់បានទេ។ សូមបិទភ្ជាប់ដោយដៃ។",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setText('');
    setFilename('');
    toast({
      title: "ជម្រះបានជោគជ័យ",
      description: "ប្រអប់អត្ថបទត្រូវបានជម្រះ",
    });
  };

  const handleDownload = () => {
    if (text.trim() === '') {
      toast({
        title: "គ្មានអត្ថបទ",
        description: "សូមបញ្ចូលអត្ថបទដើម្បីទាញយក។",
        variant: "destructive",
      });
      return;
    }

    const finalFilename = filename.trim() || 'myfile.txt';
    
    // Create blob and download
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "ទាញយកបានជោគជ័យ",
      description: `ឯកសារ "${finalFilename}" ត្រូវបានទាញយក`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-kantumruy">
      <Card className="glass p-8 rounded-3xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-foreground mb-6">
          កម្មវិធីបម្លែងអត្ថបទទៅឯកសារ
        </h1>
        
        {/* Control buttons */}
        <div className="flex space-x-2 mb-4">
          <Button 
            variant="paste" 
            className="flex-1 py-3"
            onClick={handlePaste}
          >
            <Clipboard className="w-5 h-5" />
            បិទភ្ជាប់
          </Button>
          <Button 
            variant="clear" 
            className="flex-1 py-3"
            onClick={handleClear}
          >
            <Trash2 className="w-5 h-5" />
            ជម្រះ
          </Button>
        </div>
        
        {/* Text area */}
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="បញ្ចូលអត្ថបទរបស់អ្នកនៅទីនេះ..."
          className="w-full h-48 mb-4 text-foreground border-2 rounded-xl focus:ring-4 focus:ring-ring transition-smooth shadow-inner resize-none"
        />
        
        {/* Filename input */}
        <div className="mb-6">
          <Label htmlFor="filename" className="block text-sm font-medium text-foreground mb-1">
            ឈ្មោះឯកសារ
          </Label>
          <Input
            id="filename"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="myfile.txt"
            className="w-full border-2 rounded-xl focus:ring-4 focus:ring-ring transition-smooth shadow-inner"
          />
        </div>

        {/* Download button */}
        <Button 
          onClick={handleDownload}
          className="w-full py-3 font-bold"
          size="lg"
        >
          <Download className="w-5 h-5" />
          ទាញយក
        </Button>
      </Card>
    </div>
  );
};

export default TextConverter;