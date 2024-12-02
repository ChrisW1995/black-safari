'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, User, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'blacksafari_tokyo@outlook.jp'
        }),
      });

      if (!response.ok) throw new Error('送信に失敗しました');

      setSubmitStatus({
        type: 'success',
        message: '送信が完了しました。できるだけ早くご連絡させていただきます。'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'エラーが発生しました。後でもう一度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-5xl pb-6 font-bold text-white mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Contact Infomation
        </h1>

        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-8 text-center">お問い合わせフォーム</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <User size={16} className="text-gray-500" />
                お名前 *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 text-white transition-all duration-300 placeholder:text-gray-600"
                placeholder="山田 太郎"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-gray-500" />
                メールアドレス *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 text-white transition-all duration-300 placeholder:text-gray-600"
                placeholder="example@email.com"
              />
            </div>

            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-gray-500" />
                電話番号
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 text-white transition-all duration-300 placeholder:text-gray-600"
                placeholder="080-1234-5678"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <MessageSquare size={16} className="text-gray-500" />
                メッセージ *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-white/50 focus:ring-2 focus:ring-white/20 text-white transition-all duration-300 placeholder:text-gray-600 resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>

            {submitStatus.message && (
              <div 
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-900/50 border border-green-500/50 text-green-200' 
                    : 'bg-red-900/50 border border-red-500/50 text-red-200'
                } animate-fade-in`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 px-6 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  送信中...
                </div>
              ) : (
                <>
                  <Send size={18} />
                  <span>送信する</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;