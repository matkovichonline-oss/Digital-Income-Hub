import { useState } from 'react';
import { Wand2, Download, Copy, Check } from 'lucide-react';

export const KDPHelper = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{title: string, desc: string} | null>(null);
  const [copied, setCopied] = useState<'title' | 'desc' | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setResult({
        title: `${topic || 'Classic Book'} (Annotated & Illustrated Edition)`,
        desc: `Discover the ultimate annotated version of ${topic || 'this classic'}. Includes modern insights, premium illustrations, and a study guide for today's readers.`
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, type: 'title' | 'desc') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">KDP Assistant</h1>
          <p className="text-muted">AI-powered metadata generation and manuscript formatting.</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="glass-panel">
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wand2 size={24} className="text-accent" style={{ color: 'var(--accent-primary)' }} />
            Metadata Generator
          </h2>
          
          <div className="input-group">
            <label>Public Domain Book Title / Topic</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="e.g. Think and Grow Rich"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <button 
            className="btn btn-primary btn-glow" 
            style={{ width: '100%', marginTop: '10px' }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Compliant Metadata'}
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--panel-border)' }} className="animate-fade-in">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="text-muted" style={{ fontSize: '0.9rem' }}>Optimized Title</label>
                  <button 
                    onClick={() => copyToClipboard(result.title, 'title')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                  >
                    {copied === 'title' ? <Check size={14}/> : <Copy size={14}/>}
                    {copied === 'title' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 500 }}>
                  {result.title}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="text-muted" style={{ fontSize: '0.9rem' }}>Description (max 80 chars preview)</label>
                  <button 
                    onClick={() => copyToClipboard(result.desc, 'desc')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                  >
                    {copied === 'desc' ? <Check size={14}/> : <Copy size={14}/>}
                    {copied === 'desc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {result.desc}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '24px' }}>
            <Download size={40} />
          </div>
          <h2 style={{ marginBottom: '16px' }}>Manuscript Formatter</h2>
          <p className="text-muted" style={{ marginBottom: '24px' }}>
            Upload your raw .txt or .docx file and we'll automatically format it with correct margins, chapter headers, and table of contents for KDP.
          </p>
          <button className="btn btn-outline" style={{ width: '100%', maxWidth: '250px' }}>Upload Manuscript</button>
          <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Supported formats: .txt, .docx</div>
        </div>
      </div>
    </div>
  );
};
