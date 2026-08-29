'use client';

import { motion } from 'framer-motion';

interface StoryCardProps {
  onBack: () => void;
  couple?: any;
}

const STORY_ITEMS = [
  {
    title: 'pertemuan',
    content: 'Perjalanan kita, terlalu panjang untuk sekedar diceritakan dengan kata-kata. Ada banyak cerita, jarak, waktu dan proses yang kita lewati bersama. Tidak selalu mudah, tapi kita selalu belajar untuk saling memahami, memberikan dukungan dan memilih tetap bersama saat keadaan terasa sulit. Pada akhirnya, kita memilih untuk menetap dan terus menguatkan satu sama lain untuk selamanya.',
  },
  {
    title: 'bukti',
    content: 'Perjalanan ini tidak selalu mudah. Ada Jarak yang harus dilewati, banyak keadaan yang mengajarkan kita tentang kesabaran dan kepercayaan. Setiap ujian menjadi bukti bahwa rasa ini layak diperjuangkan, hingga akhirnya kami yakin untuk menetap, berjalan bersama, dan saling menguatkan untuk selamanya.',
  },
  {
    title: 'Keyakinan',
    content: 'Setiap perjalanan memiliki waktu terbaik untuk sampai tujuannya. Kita menantikan hari sakral saat dua Hati dipersatukan dalam ikatan suci',
  },
  {
    title: 'Awal Selamanya',
    content: 'Kita akan melangkah ke babak baru dengan penuh syukur, kita memohon doa dan restu dari orang-orang yang kita cintai, agar langkah awal menuju kehidupan baru ini senantiasa diberi keberkahan, kelapangan hati, dan kekuatan untuk berjalan bersama hingga akhir.',
  },
];

export function StoryCard({ onBack }: StoryCardProps) {
  const groundGrass = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground1.png";
  const groundDirt = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground3.png";
  const letterImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/letter.png";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center bg-[#73B5E5] font-pixel overflow-y-auto custom-scrollbar"
    >
      <button 
        onClick={onBack}
        className="fixed top-4 right-4 z-50 bg-[#C83B25] text-[#EFEABF] px-3 py-2 text-xs rounded border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#a9311e] active:translate-y-1 active:shadow-[1px_1px_0_#3e2723]"
      >
        BACK
      </button>

      {/* Sky & Background Elements */}
      <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="fixed top-[2%] left-[-2%] w-24 md:w-32 opacity-90 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} />
      <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="fixed top-[8%] right-[2%] w-20 md:w-28 opacity-85 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} />
      <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds1.png" alt="Cloud" className="fixed top-[25%] left-[30%] w-32 md:w-48 opacity-80 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} />

      <div className="w-full max-w-md pt-12 pb-12 px-4 z-20 flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl text-center mb-8 tracking-widest uppercase leading-tight font-bold drop-shadow-md">
          LAND OF<br/>STORY
        </h1>

        {/* Verse */}
        <div className="text-center mb-10">
          <h2 className="text-white text-sm sm:text-base font-bold mb-3 drop-shadow">Q.S. Ar-Rum ayat 21</h2>
          <p className="text-white text-[10px] sm:text-xs font-sans leading-relaxed px-4 drop-shadow-md">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
        </div>

        {/* Scrolls List */}
        <div className="w-full flex flex-col items-center space-y-8">
          {STORY_ITEMS.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative w-full max-w-[320px] aspect-[548/588] flex flex-col items-center justify-center"
            >
              {/* Background Letter Image */}
              <img 
                src={letterImg} 
                alt="Letter Scroll" 
                className="absolute inset-0 w-full h-full object-contain"
                style={{ imageRendering: 'pixelated', filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.15))' }} 
              />
              
              {/* Content Area within the paper */}
              <div className="relative z-10 w-full h-full">
                {/* Title on Top Roller */}
                <h3 className="absolute top-[11.5%] left-0 w-full text-center text-[#5C3A21] text-[10px] sm:text-xs font-pixel font-bold tracking-wider">
                  {item.title}
                </h3>
                
                {/* Text inside the lighter paper area */}
                <div className="absolute top-[26%] bottom-[20%] left-[24%] right-[24%] flex flex-col overflow-y-auto custom-scrollbar pr-1">
                  <p className="text-[#5C3A21] text-[8px] sm:text-[9px] font-pixel leading-[1.8] text-center">
                    "{item.content}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Strict Pixel Grid Bottom Stage - Relative to flow at the end */}
      <div className="relative w-full h-[300px] pointer-events-none z-10 mt-auto flex-shrink-0">
        <div className="absolute bottom-[128px] w-full h-[180px] bg-repeat-x bg-bottom z-10" style={{ backgroundImage: 'url("https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/background.png")', backgroundSize: 'auto 100%', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-0 w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundDirt}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-[64px] w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundGrass}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[172px] z-30">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom&bride2.png" alt="Groom and Bride" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="w-full flex items-center justify-center py-4 bg-[#73B5E5] z-20 flex-shrink-0">
        <p className="text-white font-pixel text-[6px] sm:text-[8px] drop-shadow-md tracking-wider">
          Copyright <a href="https://hilmiputra.my.id" target="_blank" rel="noreferrer" className="underline hover:text-gray-200 pointer-events-auto">hilmiputra.my.id</a> 2026
        </p>
      </div>
    </motion.div>
  );
}
