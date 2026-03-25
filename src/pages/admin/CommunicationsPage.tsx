import { useState } from 'react';
import { Send, Clock, FileText, Check, X, Plus, Trash2, Eye } from 'lucide-react';

interface Message {
  id: string;
  title: string;
  body: string;
  type: 'push' | 'email' | 'sms';
  audience: string;
  status: 'sent' | 'scheduled' | 'draft';
  sentAt?: string;
  scheduledAt?: string;
  delivered: number;
  opened: number;
  clicked: number;
}

const templates = [
  { id: 't1', name: 'Welcome Message', body: 'Welcome to MOBILIFE! Your loyalty journey begins now with exclusive rewards from MGC-ASIA brands.' },
  { id: 't2', name: 'Points Reminder', body: 'You have {{points}} points expiring on {{date}}. Redeem now before they expire!' },
  { id: 't3', name: 'Birthday Greeting', body: 'Happy Birthday! Enjoy a special reward just for you. Check your MOBILIFE app for your birthday gift.' },
  { id: 't4', name: 'Campaign Announcement', body: 'New campaign alert! {{campaign_name}} is now live. Don\'t miss out on exclusive offers.' },
  { id: 't5', name: 'Service Reminder', body: 'Your vehicle service is due. Book an appointment through MOBILIFE and earn bonus points.' },
];

const initialMessages: Message[] = [
  { id: 'm1', title: 'BMW Summer Drive Launch', body: 'BMW Summer Drive Experience is now live! Redeem 5,000 points for a 20% service discount.', type: 'push', audience: 'All Members', status: 'sent', sentAt: '2026-03-20 09:00', delivered: 38500, opened: 21200, clicked: 8400 },
  { id: 'm2', title: 'Points Expiry Warning', body: 'Your points are expiring on Dec 31, 2026. Redeem now!', type: 'push', audience: 'Members with expiring points', status: 'sent', sentAt: '2026-03-15 10:00', delivered: 12800, opened: 8900, clicked: 3200 },
  { id: 'm3', title: 'Maserati x Azimut Exclusive', body: 'Exclusive yacht day trip experience for Infinite Blue Diamond members.', type: 'push', audience: 'Infinite Blue Diamond', status: 'sent', sentAt: '2026-03-10 14:00', delivered: 1800, opened: 1200, clicked: 450 },
  { id: 'm4', title: 'April Maintenance Reminder', body: 'Schedule your Spring vehicle service and earn 3x points.', type: 'push', audience: 'All Members', status: 'scheduled', scheduledAt: '2026-04-01 08:00', delivered: 0, opened: 0, clicked: 0 },
  { id: 'm5', title: 'HD Riding Camp Slots', body: 'Limited slots available for the Harley-Davidson Riding Camp. Reserve now!', type: 'push', audience: 'Diamond & above', status: 'draft', delivered: 0, opened: 0, clicked: 0 },
];

export default function CommunicationsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showComposer, setShowComposer] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const [form, setForm] = useState<Partial<Message>>({
    title: '', body: '', type: 'push', audience: 'all', status: 'draft'
  });
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const filtered = messages.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sendNow = () => {
    if (!form.title || !form.body) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      title: form.title!,
      body: form.body!,
      type: form.type as 'push' | 'email' | 'sms',
      audience: form.audience || 'All Members',
      status: 'sent',
      sentAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      delivered: Math.floor(Math.random() * 30000) + 10000,
      opened: Math.floor(Math.random() * 15000) + 5000,
      clicked: Math.floor(Math.random() * 5000) + 1000,
    };
    setMessages(prev => [newMsg, ...prev]);
    setShowComposer(false);
    setForm({ title: '', body: '', type: 'push', audience: 'all', status: 'draft' });
    showToast('Message sent successfully!');
  };

  const scheduleMessage = () => {
    if (!form.title || !form.body || !scheduleDate) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      title: form.title!,
      body: form.body!,
      type: (form.type || 'push') as 'push' | 'email' | 'sms',
      audience: form.audience || 'All Members',
      status: 'scheduled',
      scheduledAt: `${scheduleDate} ${scheduleTime}`,
      delivered: 0, opened: 0, clicked: 0,
    };
    setMessages(prev => [newMsg, ...prev]);
    setShowComposer(false);
    setForm({ title: '', body: '', type: 'push', audience: 'all', status: 'draft' });
    setScheduleDate('');
    showToast('Message scheduled!');
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast('Message deleted!');
  };

  const useTemplate = (body: string) => {
    setForm(prev => ({ ...prev, body }));
    setShowTemplates(false);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B5B]">Communications</h1>
          <p className="text-sm text-slate-500 mt-1">Push notifications, messaging & templates</p>
        </div>
        <button onClick={() => setShowComposer(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] rounded-lg text-sm text-white font-semibold hover:bg-[#B8944D]">
          <Plus size={16} /> Compose Message
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-slate-500">Total Sent</p>
          <p className="text-2xl font-bold text-[#1B2B5B] mt-1">{messages.filter(m => m.status === 'sent').length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-slate-500">Scheduled</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{messages.filter(m => m.status === 'scheduled').length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-slate-500">Avg Open Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {messages.filter(m => m.status === 'sent').length > 0
              ? `${Math.round(messages.filter(m => m.status === 'sent').reduce((acc, m) => acc + (m.delivered > 0 ? (m.opened / m.delivered) * 100 : 0), 0) / messages.filter(m => m.status === 'sent').length)}%`
              : '0%'}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-slate-500">Avg Click Rate</p>
          <p className="text-2xl font-bold text-[#C9A96E] mt-1">
            {messages.filter(m => m.status === 'sent').length > 0
              ? `${Math.round(messages.filter(m => m.status === 'sent').reduce((acc, m) => acc + (m.delivered > 0 ? (m.clicked / m.delivered) * 100 : 0), 0) / messages.filter(m => m.status === 'sent').length)}%`
              : '0%'}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C9A96E]" />
          <Send size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 text-sm text-slate-600">
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="text-left py-3 px-4 font-medium">Message</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Audience</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Delivered</th>
                <th className="text-left py-3 px-4 font-medium">Opened</th>
                <th className="text-left py-3 px-4 font-medium">Clicked</th>
                <th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-xs text-slate-900">{m.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{m.body}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500 uppercase">{m.type}</td>
                  <td className="py-3 px-4 text-xs text-slate-500">{m.audience}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(m.status)}`}>{m.status}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500">{m.sentAt || m.scheduledAt || '—'}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{m.delivered > 0 ? m.delivered.toLocaleString() : '—'}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{m.opened > 0 ? m.opened.toLocaleString() : '—'}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{m.clicked > 0 ? m.clicked.toLocaleString() : '—'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setViewMessage(m)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><Eye size={14} /></button>
                      <button onClick={() => deleteMessage(m.id)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowComposer(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Compose Message</h2>
              <button onClick={() => setShowComposer(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="Message title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as 'push' | 'email' | 'sms' })}
                    className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
                    <option value="push">Push Notification</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Target Audience</label>
                  <select value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
                    <option value="All Members">All Members</option>
                    <option value="Diamond & above">Diamond & above</option>
                    <option value="Black Diamond & above">Black Diamond & above</option>
                    <option value="Infinite Blue Diamond">Infinite Blue Diamond</option>
                    <option value="BMW Owners">BMW Owners</option>
                    <option value="Honda Owners">Honda Owners</option>
                    <option value="Members with expiring points">Expiring Points</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-600">Message Body *</label>
                  <button onClick={() => setShowTemplates(!showTemplates)} className="text-xs text-[#C9A96E] hover:underline flex items-center gap-1">
                    <FileText size={12} /> Use Template
                  </button>
                </div>
                {showTemplates && (
                  <div className="mb-2 bg-slate-50 rounded-lg p-2 border border-slate-200 space-y-1">
                    {templates.map(t => (
                      <button key={t.id} onClick={() => useTemplate(t.body)}
                        className="w-full text-left px-2 py-1.5 text-xs hover:bg-white rounded transition-colors">
                        <span className="font-medium text-slate-700">{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm h-24 resize-none focus:outline-none focus:border-[#C9A96E]" placeholder="Write your message..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Schedule (optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)}
                    className="border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#C9A96E]" />
                  <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)}
                    className="border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#C9A96E]" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowComposer(false)} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
                {scheduleDate ? (
                  <button onClick={scheduleMessage} className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Clock size={14} /> Schedule
                  </button>
                ) : (
                  <button onClick={sendNow} className="flex-1 py-2.5 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D] flex items-center justify-center gap-2">
                    <Send size={14} /> Send Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setViewMessage(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Message Details</h2>
              <button onClick={() => setViewMessage(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div><p className="text-xs text-slate-500">Title</p><p className="text-sm font-medium text-slate-900">{viewMessage.title}</p></div>
              <div><p className="text-xs text-slate-500">Body</p><p className="text-sm text-slate-700">{viewMessage.body}</p></div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-slate-500">Type</p><p className="font-medium text-slate-900 uppercase">{viewMessage.type}</p></div>
                <div><p className="text-slate-500">Audience</p><p className="font-medium text-slate-900">{viewMessage.audience}</p></div>
                <div><p className="text-slate-500">Status</p><p><span className={`px-2 py-0.5 rounded-full font-medium ${statusColor(viewMessage.status)}`}>{viewMessage.status}</span></p></div>
                <div><p className="text-slate-500">Date</p><p className="font-medium text-slate-900">{viewMessage.sentAt || viewMessage.scheduledAt || '—'}</p></div>
              </div>
              {viewMessage.status === 'sent' && (
                <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-lg p-3">
                  <div className="text-center"><p className="text-xs text-slate-500">Delivered</p><p className="font-bold text-sm text-slate-900">{viewMessage.delivered.toLocaleString()}</p></div>
                  <div className="text-center"><p className="text-xs text-slate-500">Opened</p><p className="font-bold text-sm text-green-600">{viewMessage.opened.toLocaleString()}</p></div>
                  <div className="text-center"><p className="text-xs text-slate-500">Clicked</p><p className="font-bold text-sm text-[#C9A96E]">{viewMessage.clicked.toLocaleString()}</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
