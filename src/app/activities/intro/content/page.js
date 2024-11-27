export default function IntroContent() {
  return (
    <div className="p-8 md:p-12 min-h-screen">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main Visual */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            {/* <img 
              src="/api/placeholder/1920/1080" 
              alt="BLACK SAFARI Event"
              className="w-full h-full object-cover"
            /> */}
          </div>

          {/* Title and Introduction */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">BLACK SAFARI 2024</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Established in Tokyo's iconic Shinjuku 2-chome gay district for Golden Week 2024, 
              BLACK SAFARI represents a revolutionary party event brand that celebrates diversity, 
              expression, and freedom. Join us on May 5, 2024 (SUN) for an unforgettable experience.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-white">LGBTQ Rainbow Values</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-600/90 p-6 rounded-lg shadow-sm border border-red-400">
                <h5 className="text-xl font-semibold text-white mb-3">Red: Sex</h5>
                <p className="text-gray-100">
                  Abolishing unjust laws; sexual rights are human rights
                </p>
              </div>
              <div className="bg-orange-500/90 p-6 rounded-lg shadow-sm border border-orange-400">
                <h5 className="text-xl font-semibold text-white mb-3">Orange: Power</h5>
                <p className="text-gray-100">
                  A collective display; together, we are power
                </p>
              </div>
              <div className="bg-yellow-500/90 p-6 rounded-lg shadow-sm border border-yellow-400">
                <h5 className="text-xl font-semibold text-white mb-3">Yellow: Hope</h5>
                <p className="text-gray-100">
                  Moving forward bravely to sow the seeds of hope
                </p>
              </div>
              <div className="bg-green-600/90 p-6 rounded-lg shadow-sm border border-green-400">
                <h5 className="text-xl font-semibold text-white mb-3">Green: Nature</h5>
                <p className="text-gray-100">
                  Embracing differences and expressing true nature authentically
                </p>
              </div>
              <div className="bg-blue-600/90 p-6 rounded-lg shadow-sm border border-blue-400">
                <h5 className="text-xl font-semibold text-white mb-3">Blue: Freedom</h5>
                <p className="text-gray-100">
                  Celebrating autonomy and diversity; liberating bodily freedom
                </p>
              </div>
              <div className="bg-purple-600/90 p-6 rounded-lg shadow-sm border border-purple-400">
                <h5 className="text-xl font-semibold text-white mb-3">Purple: Art</h5>
                <p className="text-gray-100">
                  Living authentically and creating vibrant art
                </p>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-white">About The Event</h4>
            <div className="bg-gray-800/90 p-6 rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                The event incorporates the theme of SAFARI's 27 animals, symbolizing its dedication to the LGBTQ community 
                and its mission to create a space where people from all backgrounds can connect, celebrate, and revel in 
                the festive atmosphere. The party's music lineup focuses on three primary genres: Vocal Circuit House, 
                Tribal Circuit House, and Dark Circuit House. Beyond the music, BLACK SAFARI offers a range of distinctive 
                performances, including the brand's unique stage drama GOGO show, erotic shows featuring adult film actors, 
                and Japan's one-of-a-kind naked bath towel flag performance, all designed to immerse guests in an atmosphere 
                of passion and excitement. Additionally, BLACK SAFARI has partnered with globally renowned sports brands Nike 
                and Under Armour to create exclusive fitness apparel. Plans are underway for future collaborations with Adidas 
                and other sports brands. Customers interested in these products are welcome to contact us for further inquiries.
              </p>
            </div>
          </div>

          {/* Event Information */}
          {/* <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-white">Event Details</h4>
            <div className="bg-gray-800/90 p-6 rounded-lg space-y-4">
              <div className="flex gap-4">
                <div className="w-32 font-semibold text-gray-300">Location</div>
                <div className="text-gray-300">Shinjuku 2-chome, Tokyo</div>
              </div>
              <div className="flex gap-4">
                <div className="w-32 font-semibold text-gray-300">Date</div>
                <div className="text-gray-300">May 5, 2024 (SUN) - Golden Week</div>
              </div>
              <div className="flex gap-4">
                <div className="w-32 font-semibold text-gray-300">Who Can Join</div>
                <div className="text-gray-300">Open to all who celebrate diversity and expression</div>
              </div>
            </div>
          </div> */}

          {/* Contact Information */}
          {/* <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-white">Contact Us</h4>
            <div className="bg-gray-800/90 p-6 rounded-lg space-y-4">
              <div className="flex gap-4">
                <div className="w-32 font-semibold text-gray-300">Email</div>
                <div className="text-gray-300">contact@blacksafari.com</div>
              </div>
              <div className="flex gap-4">
                <div className="w-32 font-semibold text-gray-300">Social Media</div>
                <div className="text-gray-300">Instagram: @blacksafari.jp</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}