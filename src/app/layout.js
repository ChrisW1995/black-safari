import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'BLACK SAFARI',
  description: 'BLACK SAFARI official website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen relative">
          {/* 背景圖片 */}
          <div 
  className="fixed inset-0 w-full h-full bg-adaptive -z-10"
  style={{ 
    backgroundImage: 'url("/images/background.jpg")',
  }}
/>
          {/* 背景遮罩 */}
          <div className="fixed inset-0 bg-black/40 -z-10" />
          
          {/* 導航選單 */}
          <Navigation />

          {/* 主內容區 */}
          <div className="flex-1 relative">
            <div className="h-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}