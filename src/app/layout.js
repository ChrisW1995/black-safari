import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'BLACK SAFARI',
  description: 'BLACK SAFARI official website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <div className="flex min-h-screen">
            {/* 背景圖片 */}
            <div 
              className="fixed inset-0 w-full h-full bg-center bg-no-repeat -z-10"
              style={{ 
                backgroundImage: 'url("/images/background.jpg")',
                backgroundSize: 'contain',
                backgroundColor: '#000',
                backgroundPosition: 'center',
                '@media (minWidth: 768px)': {
                  backgroundSize: 'cover'
                }
              }}
            />
            {/* 背景遮罩 */}
            <div className="fixed inset-0 bg-black/40 -z-10" />
            
            <Navigation />
            <LanguageSwitcher />
            
            {/* 主內容區塊 */}
            <main className="flex-1 relative">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}