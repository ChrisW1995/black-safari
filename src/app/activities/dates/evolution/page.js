export default function IntroPage() {
    return (
      <div className="space-y-8">
        {/* 主視覺圖片 */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="BLACK SAFARI Event"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* 活動標題和簡介 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-gray-800">BLACK SAFARI</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            BLACK SAFARI 是一個結合運動、娛樂和社交的創新活動平台。我們致力於打造一個充滿活力和創意的社群，
            讓每個參與者都能在這裡找到屬於自己的精彩時刻。
          </p>
        </div>
  
        {/* 活動特色 */}
        <div className="space-y-6">
          <h4 className="text-2xl font-semibold text-gray-800">活動特色</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h5 className="text-xl font-semibold text-gray-800 mb-3">專業運動課程</h5>
              <p className="text-gray-600">
                由專業教練帶領，提供多樣化的運動課程，適合不同程度的參與者。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h5 className="text-xl font-semibold text-gray-800 mb-3">社交互動</h5>
              <p className="text-gray-600">
                創造輕鬆愉快的社交環境，讓參與者能夠在運動中建立新的友誼。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h5 className="text-xl font-semibold text-gray-800 mb-3">品牌合作</h5>
              <p className="text-gray-600">
                與知名運動品牌合作，提供優質的運動裝備和專業建議。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h5 className="text-xl font-semibold text-gray-800 mb-3">特別活動</h5>
              <p className="text-gray-600">
                定期舉辦特別活動，包括戶外探險、主題派對等精彩內容。
              </p>
            </div>
          </div>
        </div>
  
        {/* 活動資訊 */}
        <div className="space-y-6">
          <h4 className="text-2xl font-semibold text-gray-800">活動資訊</h4>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">活動地點</div>
              <div className="text-gray-600">台北市信義區信義路五段7號</div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">活動時間</div>
              <div className="text-gray-600">每週六、日 14:00-18:00</div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">參加對象</div>
              <div className="text-gray-600">對運動有興趣的所有人士</div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">費用</div>
              <div className="text-gray-600">依據不同課程和活動方案而定</div>
            </div>
          </div>
        </div>
  
        {/* 聯繫方式 */}
        <div className="space-y-6">
          <h4 className="text-2xl font-semibold text-gray-800">聯繫我們</h4>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">電子郵件</div>
              <div className="text-gray-600">contact@blacksafari.com</div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">電話</div>
              <div className="text-gray-600">(02) 2345-6789</div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 font-semibold text-gray-700">社群媒體</div>
              <div className="text-gray-600">Instagram: @blacksafari.tw</div>
            </div>
          </div>
        </div>
      </div>
    );
  }