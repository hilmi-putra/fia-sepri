'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Wish, GiftRecommendation } from '@/types';

interface BigDayCardProps {
    onBack: () => void;
    events?: any[];
    wishes?: any[];
}

export function BigDayCard({ onBack }: BigDayCardProps) {
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState('');
    const [rsvpGuests, setRsvpGuests] = useState(1);
    const [rsvpLoading, setRsvpLoading] = useState(false);
    const [rsvpSuccess, setRsvpSuccess] = useState(false);

    const [wishName, setWishName] = useState('');
    const [wishMessage, setWishMessage] = useState('');
    const [wishLoading, setWishLoading] = useState(false);
    const [wishSuccess, setWishSuccess] = useState(false);
    const [wishesList, setWishesList] = useState<Wish[]>([]);
    const [wishToDelete, setWishToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const [selectedPhoto, setSelectedPhoto] = useState<{url: string, title: string} | null>(null);

    const [gifts, setGifts] = useState<GiftRecommendation[]>([]);
    
    const dateImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/date.png";
    const letterImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/letter%20groom%20&%20bride.png";
    const mapsImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/maps%20ponyo.png?t=" + new Date().getTime();
    const btnGoogleImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/button%20google.png";
    const groundGrass = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground1.png";
    const groundDirt = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground3.png";
    const floating2 = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating2.png";
    const coupleImg = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom&bride2.png";

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        fetchWishes();
        fetchGifts();
    }, []);

    const fetchWishes = async () => {
        try {
            const response = await fetch('/api/wishes');
            if (response.ok) {
                const data = await response.json();
                setWishesList(data);
            }
        } catch (error) {
            console.error('Error fetching wishes:', error);
        }
    };

    const fetchGifts = async () => {
        try {
            const response = await fetch('/api/gifts');
            if (response.ok) {
                const data = await response.json();
                setGifts(data);
            }
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }
    };

    const handleRsvpSubmit = async () => {
        if (!rsvpName || !rsvpStatus) return;
        
        setRsvpLoading(true);
        try {
            const response = await fetch('/api/rsvps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guest_name: rsvpName,
                    attendance_status: rsvpStatus,
                    total_guest: rsvpGuests
                })
            });
            
            if (response.ok) {
                setRsvpSuccess(true);
                setRsvpName('');
                setRsvpStatus('');
                setRsvpGuests(1);
                setTimeout(() => setRsvpSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
        } finally {
            setRsvpLoading(false);
        }
    };

    const handleWishSubmit = async () => {
        if (!wishName || !wishMessage) return;
        
        setWishLoading(true);
        try {
            const response = await fetch('/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guest_name: wishName,
                    message: wishMessage
                })
            });
            
            if (response.ok) {
                setWishSuccess(true);
                setWishName('');
                setWishMessage('');
                fetchWishes();
                setTimeout(() => setWishSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error submitting wish:', error);
        } finally {
            setWishLoading(false);
        }
    };

    const handleDeleteWish = async () => {
        if (!wishToDelete) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/wishes/${wishToDelete}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setWishesList(prev => prev.filter(w => w.id !== wishToDelete));
                setWishToDelete(null);
            }
        } catch (error) {
            console.error('Error deleting wish:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        
        if (diffDays > 0) return `${diffDays} hari lalu`;
        if (diffHours > 0) return `${diffHours} jam lalu`;
        return 'Baru saja';
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("1906237060");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useEffect(() => {
        // Target date: 27 September 2026, 08:00
        const targetDate = new Date("2026-09-27T08:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const sectionVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center bg-[#73B5E5] font-pixel overflow-y-auto overflow-x-hidden custom-scrollbar"
        >
            <button
                onClick={onBack}
                className="fixed top-4 right-4 z-50 bg-[#C83B25] text-[#EFEABF] px-3 py-2 text-xs rounded border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#a9311e] active:translate-y-1 active:shadow-[1px_1px_0_#3e2723]"
            >
                BACK
            </button>

            {/* Sky & Background Elements */}
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute top-[2%] left-[-2%] w-24 md:w-32 opacity-90 pointer-events-none z-0" style={{ imageRendering: 'pixelated' }} />
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute top-[8%] right-[2%] w-20 md:w-28 opacity-85 pointer-events-none z-0" style={{ imageRendering: 'pixelated' }} />

            <div className="w-full max-w-lg pt-12 pb-16 px-4 z-20 flex flex-col items-center">

                {/* 1. Header Section */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-full flex flex-col items-center mb-16 relative mt-4">
                    <h1 className="text-white text-3xl text-center tracking-widest uppercase leading-tight font-bold drop-shadow-md z-10 mb-6">
                        LAND OF<br />THE BIG<br />DAY
                    </h1>

                    {/* Coins */}
                    <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="absolute top-[30%] left-[10%] w-6 sm:w-8" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity }} />
                    <img src={floating2} alt="Platform" className="absolute top-[40%] left-[8%] w-10 drop-shadow" style={{ imageRendering: 'pixelated' }} />

                    <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="absolute top-[30%] right-[10%] w-6 sm:w-8" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    <img src={floating2} alt="Platform" className="absolute top-[40%] right-[8%] w-10 drop-shadow" style={{ imageRendering: 'pixelated' }} />

                    {/* Date Graphic */}
                    <div className="relative w-full flex justify-center mt-4">
                        <img src={dateImg} alt="2026 Sep 27" className="w-[180px] sm:w-[220px]" style={{ imageRendering: 'pixelated' }} />

                        {/* Heart Bubble */}
                        <motion.img 
                            src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/speechbubble.png?updatedAt=1787986152727" 
                            alt="Heart Bubble" 
                            className="absolute top-[35%] right-[10%] sm:right-[15%] w-10 sm:w-12 drop-shadow-sm" 
                            style={{ imageRendering: 'pixelated' }}
                            animate={{ y: [0, -5, 0] }} 
                            transition={{ duration: 3, repeat: Infinity }} 
                        />
                    </div>
                </motion.div>

        {/* 2. Profiles Section */}
        <div className="w-full flex flex-col items-center gap-6 mb-24 relative">
            
            {/* Headline & Subheadline */}
            <div className="flex flex-col items-center mb-10 px-6 mt-4">
                <h2 className="text-white text-3xl font-pixel uppercase tracking-widest font-bold text-center drop-shadow-md mb-6 leading-tight">
                    GROOM &<br/>BRIDE
                </h2>
                <p className="text-white text-xl sm:text-2xl font-serif mb-4 drop-shadow font-bold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                <p className="text-white font-pixel text-[8px] text-center leading-[1.8] max-w-[280px] drop-shadow-sm font-medium">
                    Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami.
                </p>
            </div>

            {/* Groom (Left) & Letter (Right) */}
            <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-row items-start justify-between relative z-10 px-2 sm:px-6">
                {/* Character */}
                <div className="flex flex-col items-center w-[80px] mt-4 ml-2">
                    <span className="text-white font-pixel text-[10px] font-bold mb-2 drop-shadow-md">SEPRIANOR</span>
                    <div 
                        className="relative flex flex-col items-center cursor-pointer hover:scale-110 transition-transform active:scale-95 z-20"
                        onClick={() => setSelectedPhoto({
                            url: "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-072.jpg?updatedAt=1787322219677",
                            title: "SEPRIANOR"
                        })}
                    >
                        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom_characters.png?updatedAt=1787985113980" alt="Groom" className="w-[70px] relative z-10 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                        <img src={floating2} alt="Platform" className="w-[72px] -mt-3 z-0 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                    </div>
                </div>
                {/* Letter */}
                <div className="relative w-[160px] sm:w-[180px] aspect-[3/4] mt-10 mr-2">
                   <img src={letterImg} alt="Letter" className="absolute inset-0 w-full h-full object-fill drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
                   <div className="absolute inset-0 p-4 pt-12 flex flex-col pr-8">
                      <p className="text-[#5C3A21] text-[10px] font-pixel text-right leading-[1.8] font-bold mt-2">
                         Putra ke-3<br/>dari 3<br/>bersaudara<br/>dari Bapak<br/>Jaya & Ibu<br/>Kartini.
                      </p>
                   </div>
                </div>
            </motion.div>

            {/* Clouds between Groom and Bride */}
            <div className="absolute top-[35%] w-[120%] flex justify-between items-center z-0 pointer-events-none left-[-10%] right-[-10%]">
                <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="w-48 opacity-80 -ml-12" style={{ imageRendering: 'pixelated' }} />
                <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="w-48 opacity-90 -mr-12 mt-20" style={{ imageRendering: 'pixelated' }} />
            </div>

            {/* Bride (Right) & Letter (Left) */}
            <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-row items-start justify-between relative z-10 px-2 sm:px-6 mt-8">
                {/* Letter */}
                <div className="relative w-[160px] sm:w-[180px] aspect-[3/4] ml-2">
                   <img src={letterImg} alt="Letter" className="absolute inset-0 w-full h-full object-fill drop-shadow-lg" style={{ imageRendering: 'pixelated' }} />
                   <div className="absolute inset-0 p-4 pt-12 flex flex-col pl-8">
                      <p className="text-[#5C3A21] text-[10px] font-pixel text-left leading-[1.8] font-bold mt-2">
                         Putri ke-2<br/>dari 3<br/>bersaudara<br/>dari Bapak<br/>Rusmana &<br/>Ibu Nely<br/>Nailan A.
                      </p>
                   </div>
                </div>
                {/* Character */}
                <div className="flex flex-col items-center w-[100px] mt-16 mr-2">
                    <span className="text-white font-pixel text-[10px] font-bold mb-2 text-center leading-tight drop-shadow-md">FIA<br/>KHOERUNNISA</span>
                    <div 
                        className="relative flex flex-col items-center cursor-pointer hover:scale-110 transition-transform active:scale-95 z-20"
                        onClick={() => setSelectedPhoto({
                            url: "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-004.jpg?updatedAt=1787322211836",
                            title: "FIA"
                        })}
                    >
                        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/bride_characters.png?updatedAt=1787985113617" alt="Bride" className="w-[100px] relative z-10 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                        <img src={floating2} alt="Platform" className="w-[85px] -mt-5 z-0 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                    </div>
                </div>
            </motion.div>

            {/* Clouds below Bride */}
            <div className="absolute bottom-[-5%] w-[120%] flex justify-between items-center z-0 pointer-events-none left-[-10%] right-[-10%]">
                <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="w-56 opacity-80 -ml-16" style={{ imageRendering: 'pixelated' }} />
                <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="w-56 opacity-90 -mr-16 mt-12" style={{ imageRendering: 'pixelated' }} />
            </div>
        </div>

                {/* 3. Save The Date */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center mb-16">
                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-6">SAVE THE<br />DATE</h2>
                    <div className="flex flex-row items-center justify-center gap-1 sm:gap-2">
                        {/* Box Hari */}
                        <div className="flex flex-col items-center">
                            <div className="bg-[#FFF6D9] border-[3px] border-[#5C3A21] rounded-lg p-2 sm:p-3 shadow-[0_4px_0_#5C3A21] mb-2 w-[45px] sm:w-[55px] flex justify-center">
                                <span className="font-pixel text-[#5C3A21] text-sm sm:text-lg font-bold">{timeLeft.days}</span>
                            </div>
                            <div className="bg-[#B38B72] border-[3px] border-[#5C3A21] rounded-md px-1 sm:px-2 py-1 shadow-[0_3px_0_#5C3A21]">
                                <span className="font-pixel text-white text-[7px] sm:text-[8px]">HARI</span>
                            </div>
                        </div>
                        <span className="text-[#e07a5f] text-xs sm:text-sm mt-[-20px]">-</span>
                        {/* Box Jam */}
                        <div className="flex flex-col items-center">
                            <div className="bg-[#FFF6D9] border-[3px] border-[#5C3A21] rounded-lg p-2 sm:p-3 shadow-[0_4px_0_#5C3A21] mb-2 w-[45px] sm:w-[55px] flex justify-center">
                                <span className="font-pixel text-[#5C3A21] text-sm sm:text-lg font-bold">{timeLeft.hours}</span>
                            </div>
                            <div className="bg-[#B38B72] border-[3px] border-[#5C3A21] rounded-md px-1 sm:px-2 py-1 shadow-[0_3px_0_#5C3A21]">
                                <span className="font-pixel text-white text-[7px] sm:text-[8px]">JAM</span>
                            </div>
                        </div>
                        <span className="text-[#e07a5f] text-xs sm:text-sm mt-[-20px]">-</span>
                        {/* Box Menit */}
                        <div className="flex flex-col items-center">
                            <div className="bg-[#FFF6D9] border-[3px] border-[#5C3A21] rounded-lg p-2 sm:p-3 shadow-[0_4px_0_#5C3A21] mb-2 w-[45px] sm:w-[55px] flex justify-center">
                                <span className="font-pixel text-[#5C3A21] text-sm sm:text-lg font-bold">{timeLeft.minutes}</span>
                            </div>
                            <div className="bg-[#B38B72] border-[3px] border-[#5C3A21] rounded-md px-1 sm:px-2 py-1 shadow-[0_3px_0_#5C3A21]">
                                <span className="font-pixel text-white text-[7px] sm:text-[8px]">MENIT</span>
                            </div>
                        </div>
                        <span className="text-[#e07a5f] text-xs sm:text-sm mt-[-20px]">-</span>
                        {/* Box Detik */}
                        <div className="flex flex-col items-center">
                            <div className="bg-[#FFF6D9] border-[3px] border-[#5C3A21] rounded-lg p-2 sm:p-3 shadow-[0_4px_0_#5C3A21] mb-2 w-[45px] sm:w-[55px] flex justify-center">
                                <span className="font-pixel text-[#5C3A21] text-sm sm:text-lg font-bold">{timeLeft.seconds}</span>
                            </div>
                            <div className="bg-[#B38B72] border-[3px] border-[#5C3A21] rounded-md px-1 sm:px-2 py-1 shadow-[0_3px_0_#5C3A21]">
                                <span className="font-pixel text-white text-[7px] sm:text-[8px]">DETIK</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Time and Place */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center mb-16 relative">
                    
                    {/* Background Clouds for this section */}
                    <div className="absolute top-[10%] w-full h-full flex flex-col justify-between items-center z-0 pointer-events-none">
                        {/* Cloud left behind maps */}
                        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute left-[-20%] top-[10%] w-56 opacity-80" style={{ imageRendering: 'pixelated' }} />
                        {/* Cloud right behind schedule */}
                        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute right-[-30%] top-[80%] w-64 opacity-50" style={{ imageRendering: 'pixelated' }} />
                        {/* Cloud bottom left */}
                        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute left-[-15%] bottom-[-5%] w-48 opacity-80" style={{ imageRendering: 'pixelated' }} />
                    </div>

                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold text-center drop-shadow-md mb-6 z-10">TIME AND<br />PLACE OF<br />EVENT</h2>

                    <img src={mapsImg} alt="Maps Ponyo" className="w-[85%] max-w-[280px] mb-4 drop-shadow-md z-10" style={{ imageRendering: 'pixelated' }} />

                    <a href="https://maps.app.goo.gl/XVcdKnxemtvnv1Sj6" target="_blank" rel="noreferrer" className="w-[50%] max-w-[180px] hover:scale-105 active:scale-95 transition-transform mb-8 z-10">
                        <img src={btnGoogleImg} alt="Google Maps" className="w-full drop-shadow" style={{ imageRendering: 'pixelated' }} />
                    </a>

                    {/* Schedule Text */}
                    <div className="w-full max-w-[360px] px-4 flex flex-col font-pixel text-white drop-shadow-md z-10 mt-4">
                        
                        {/* Akad */}
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-6 py-4 px-2 text-center sm:text-left">
                            <span className="text-2xl sm:text-3xl font-bold sm:min-w-[160px] sm:text-right">08:00</span>
                            <span className="text-lg sm:text-xl flex-1 tracking-wider">Akad</span>
                        </div>
                        
                        <div className="w-full h-[2px] bg-white opacity-80" />
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-6 py-4 px-2 text-center sm:text-left">
                            <span className="text-xl sm:text-2xl font-bold sm:min-w-[160px] sm:text-right">11.00 - 14.00</span>
                            <span className="text-lg sm:text-xl flex-1 tracking-wider">Resepsi</span>
                        </div>
                        
                        <div className="w-full h-[2px] bg-white opacity-80 mb-4" />
                    </div>
                </motion.div>

                {/* 5. Dresscode */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center mb-16">
                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-4 text-center">DRESSCODE</h2>
                    <p className="text-white font-pixel text-[8px] text-center mb-6 leading-[1.6] px-8 max-w-[300px] font-medium drop-shadow-sm">
                        Warna pakaian disarankan namun tidak diwajibkan. Bagi Anda yang memiliki warna pakaian di bawah ini, kami akan sangat senang jika Anda mengenakannya.
                    </p>
                    <div className="flex flex-row gap-4">
                        {/* Khaki */}
                        <div className="relative w-10 h-10 rounded-full border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] bg-[#9A916B]">
                            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white opacity-90 rounded-sm"></div>
                        </div>
                        {/* Putih */}
                        <div className="relative w-10 h-10 rounded-full border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] bg-[#F5F5F5]">
                            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                        {/* Hitam */}
                        <div className="relative w-10 h-10 rounded-full border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] bg-[#232323]">
                            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white opacity-80 rounded-sm"></div>
                        </div>
                    </div>
                </motion.div>

                {/* 6. Wedding Gift */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center mb-16">
                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-4 text-center">WEDDING<br />GIFT</h2>
                    <p className="text-white font-pixel text-[8px] text-center mb-6 leading-[1.6] px-8 max-w-[300px] font-medium drop-shadow-sm">
                        Doa dan restu Anda pada pernikahan kami sudah cukup sebagai hadiah. Namun jika Anda ingin memberikan hadiah, kami telah menyediakan:
                    </p>
                    <div className="bg-[#C1D2C1] border-[3px] border-[#3e2723] rounded-2xl w-[260px] p-5 shadow-[4px_4px_0_#3e2723] flex flex-col gap-2 font-pixel">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#3e2723] font-bold text-sm italic">BNI</span>
                        </div>
                        <span className="text-[#3e2723] font-bold text-lg tracking-wider mb-1">1906237060</span>
                        <span className="text-[#3e2723] text-[9px] mb-4 uppercase">a.n Fia Khoerunnisa</span>
                        <button 
                            onClick={handleCopy}
                            className={`border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] text-white py-2 rounded-xl text-[10px] uppercase tracking-wider active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-colors ${isCopied ? 'bg-[#78A977]' : 'bg-[#8BB7A3] hover:bg-[#729e89]'}`}
                        >
                            <span>{isCopied ? "BERHASIL DISALIN!" : "SALIN REKENING"}</span>
                        </button>
                    </div>
                </motion.div>

                {/* 7. Gift Recommendations */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center mb-16 relative">
                    
                    {/* Clouds */}
                    <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute left-[-25%] top-[15%] w-44 opacity-80 pointer-events-none z-0" style={{ imageRendering: 'pixelated' }} />
                    <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute right-[-20%] bottom-[10%] w-40 opacity-80 pointer-events-none z-0" style={{ imageRendering: 'pixelated' }} />

                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-3 text-center z-10">GIFT<br />RECOMMENDATIONS</h2>
                    
                    <p className="text-white font-pixel text-[6px] sm:text-[7px] text-center mb-8 leading-[1.6] px-8 max-w-[280px] font-medium drop-shadow-sm z-10">
                        Bila Anda ingin memberikan kado fisik secara langsung, berikut adalah beberapa barang yang kami butuhkan untuk menempuh hidup baru.
                    </p>

                    <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 z-10 px-4 w-full">
                        {gifts.length > 0 ? gifts.map((gift) => (
                            <div key={gift.id} className="bg-[#C5E1DE] border-[3px] border-[#3e2723] rounded-xl w-[130px] sm:w-[140px] p-2 sm:p-3 flex flex-col items-center shadow-[4px_4px_0_#3e2723] relative pb-3">
                                
                                <div className="w-full aspect-[4/3] bg-[#FFF6D9] border-[2px] border-[#3e2723] rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                                    {gift.image_url ? (
                                        <img src={gift.image_url} alt={gift.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl">🎁</span>
                                    )}
                                </div>
                                
                                {/* Ribbon Title */}
                                <div className="bg-[#E5E9D5] border-[2px] border-[#3e2723] w-[110%] px-1 py-1.5 -mt-3 mb-2 text-center shadow-sm z-10 rounded">
                                    <span className="text-[#3e2723] font-pixel text-[7px] sm:text-[8px] font-bold uppercase line-clamp-1">{gift.name}</span>
                                </div>
                                
                                <div className="w-full flex flex-col px-1 mb-3">
                                    <span className="text-[#3e2723] font-pixel text-[7px] sm:text-[8px] font-bold line-clamp-1">{gift.description || '-'}</span>
                                    <span className="text-[#3e2723] font-pixel text-[6px] sm:text-[7px]">Rp {gift.price.toLocaleString('id-ID')}</span>
                                    <span className="text-[#7a5c4f] font-pixel text-[5px] sm:text-[6px] mt-1 font-bold">{gift.total_bought}/{gift.total_needed} terbeli</span>
                                </div>
                                
                                {gift.purchase_link ? (
                                    <a 
                                        href={gift.purchase_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[#C1D2C1] text-[#3e2723] border-[2px] border-[#3e2723] w-[95%] rounded-lg text-[7px] sm:text-[8px] font-pixel font-bold py-1.5 shadow-[2px_2px_0_#3e2723] hover:bg-[#a8bda8] active:translate-y-1 active:shadow-none uppercase text-center"
                                    >
                                        Beli Kado
                                    </a>
                                ) : (
                                    <button 
                                        disabled 
                                        className="bg-gray-300 text-gray-500 border-[2px] border-[#3e2723] w-[95%] rounded-lg text-[7px] sm:text-[8px] font-pixel font-bold py-1.5 uppercase cursor-not-allowed"
                                    >
                                        Habis
                                    </button>
                                )}
                            </div>
                        )) : (
                            <div className="text-white font-pixel text-[10px] text-center w-full py-4">
                                Belum ada rekomendasi hadiah
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* 8. RSVP & Wishes */}
                <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center z-20">
                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-6 text-center">KONFIRMASI<br />KEHADIRAN</h2>

                    <div className="w-[280px] flex flex-col gap-3 font-pixel mb-12">
                        <input 
                            type="text" 
                            placeholder="Nama Lengkap" 
                            value={rsvpName}
                            onChange={(e) => setRsvpName(e.target.value)}
                            className="w-full bg-[#E5E9D5] border-[3px] border-[#3e2723] rounded-lg px-3 py-3 text-[10px] shadow-[2px_2px_0_#3e2723] outline-none placeholder-[#8b9176] text-[#3e2723]" 
                        />

                        {/* Kehadiran Radios */}
                        <div className="flex flex-col gap-3 my-2">
                            <label className="flex items-center gap-2 cursor-pointer bg-white/20 p-2 rounded border-2 border-transparent hover:border-white/50">
                                <input 
                                    type="radio" 
                                    name="hadir" 
                                    value="hadir"
                                    checked={rsvpStatus === 'hadir'}
                                    onChange={(e) => setRsvpStatus(e.target.value)}
                                    className="w-4 h-4 accent-[#78A977]" 
                                />
                                <span className="text-white text-[10px]">Ya, Saya Hadir</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-white/20 p-2 rounded border-2 border-transparent hover:border-white/50">
                                <input 
                                    type="radio" 
                                    name="hadir" 
                                    value="tidak_hadir"
                                    checked={rsvpStatus === 'tidak_hadir'}
                                    onChange={(e) => setRsvpStatus(e.target.value)}
                                    className="w-4 h-4 accent-[#e07a5f]" 
                                />
                                <span className="text-white text-[10px]">Maaf, Tidak Bisa Hadir</span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <span className="text-white text-[10px]">Jumlah Tamu:</span>
                            <div className="flex items-center justify-between bg-[#E5E9D5] border-[3px] border-[#3e2723] rounded-lg shadow-[2px_2px_0_#3e2723]">
                                <button 
                                    onClick={() => setRsvpGuests(Math.max(1, rsvpGuests - 1))}
                                    disabled={rsvpGuests <= 1}
                                    className="px-4 py-2 text-[#3e2723] text-lg hover:bg-[#d4d9c4] rounded-l-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    -
                                </button>
                                <span className="px-4 text-[#3e2723] font-bold text-sm border-x-[3px] border-[#3e2723] py-2 flex-1 text-center bg-white">{rsvpGuests}</span>
                                <button 
                                    onClick={() => setRsvpGuests(Math.min(3, rsvpGuests + 1))}
                                    disabled={rsvpGuests >= 3}
                                    className="px-4 py-2 text-[#3e2723] text-lg hover:bg-[#d4d9c4] rounded-r-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {rsvpSuccess && (
                            <div className="w-full bg-[#78A977] text-white border-[2px] border-[#3e2723] rounded-lg px-3 py-2 text-[9px] text-center font-bold">
                                ✓ Konfirmasi berhasil dikirim!
                            </div>
                        )}

                        <button 
                            onClick={handleRsvpSubmit}
                            disabled={rsvpLoading || !rsvpName || !rsvpStatus}
                            className="w-full bg-[#52877B] text-white border-[3px] border-[#3e2723] rounded-lg py-3 shadow-[2px_2px_0_#3e2723] text-xs font-bold mt-2 hover:bg-[#437267] active:translate-y-1 active:shadow-none uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {rsvpLoading ? 'MENGIRIM...' : 'KIRIM'}
                        </button>
                    </div>

                    <h2 className="text-white text-xl sm:text-2xl font-pixel uppercase tracking-widest font-bold drop-shadow-md mb-6 text-center">WEDDING<br />WISHES</h2>

                    <div className="w-[280px] flex flex-col gap-3 font-pixel">
                        <input 
                            type="text" 
                            placeholder="Nama Lengkap" 
                            value={wishName}
                            onChange={(e) => setWishName(e.target.value)}
                            className="w-full bg-white border-[3px] border-[#3e2723] rounded-lg px-3 py-3 text-[10px] shadow-[2px_2px_0_#3e2723] outline-none placeholder-gray-400 text-[#3e2723]" 
                        />
                        <textarea 
                            placeholder="Tulis ucapan/doa..." 
                            rows={4} 
                            value={wishMessage}
                            onChange={(e) => setWishMessage(e.target.value)}
                            className="w-full bg-white border-[3px] border-[#3e2723] rounded-lg px-3 py-3 text-[10px] shadow-[2px_2px_0_#3e2723] outline-none placeholder-gray-400 text-[#3e2723] resize-none" 
                        />
                        
                        {wishSuccess && (
                            <div className="w-full bg-[#78A977] text-white border-[2px] border-[#3e2723] rounded-lg px-3 py-2 text-[9px] text-center font-bold">
                                ✓ Ucapan berhasil dikirim!
                            </div>
                        )}
                        
                        <button 
                            onClick={handleWishSubmit}
                            disabled={wishLoading || !wishName || !wishMessage}
                            className="w-full bg-[#B3A17B] text-white border-[3px] border-[#3e2723] rounded-lg py-3 shadow-[2px_2px_0_#3e2723] text-[10px] font-bold hover:bg-[#9c8b66] active:translate-y-1 active:shadow-none uppercase tracking-wider mb-6 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {wishLoading ? 'MENGIRIM...' : 'KIRIM UCAPAN'}
                        </button>

                        {/* Wishes List */}
                        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                            {wishesList.length > 0 ? (
                                wishesList.map((wish) => (
                                    <div key={wish.id} className="bg-[#FFF6D9] border-[3px] border-[#3e2723] rounded-lg p-3 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[#3e2723] font-bold text-[10px]">{wish.guest_name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-[8px] font-sans">{formatTimeAgo(wish.created_at)}</span>
                                                <button 
                                                    onClick={() => setWishToDelete(wish.id)}
                                                    className="text-[#C83B25] hover:text-[#a9311e] flex items-center justify-center border border-[#C83B25] rounded-sm w-4 h-4 shadow-[1px_1px_0_#3e2723] active:translate-y-[1px] active:shadow-none"
                                                    title="Hapus"
                                                >
                                                    <span className="text-[10px] leading-none font-bold">×</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[#5C3A21] text-[9px] leading-relaxed font-semibold">{wish.message}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-[#FFF6D9] border-[3px] border-[#3e2723] rounded-lg p-3 shadow-sm text-center">
                                    <p className="text-[#5C3A21] text-[9px] font-semibold">Belum ada ucapan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Strict Pixel Grid Bottom Stage - Relative to flow at the end */}
            <div className="relative w-full h-[300px] pointer-events-none z-10 mt-auto flex-shrink-0">
                <div className="absolute bottom-[128px] w-full h-[180px] bg-repeat-x bg-bottom z-10" style={{ backgroundImage: 'url("https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/background.png")', backgroundSize: 'auto 100%', imageRendering: 'pixelated' }} />
                <div className="absolute bottom-0 w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundDirt}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
                <div className="absolute bottom-[64px] w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundGrass}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />

                {/* Couple Standing on Ground */}
                <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[172px] z-30">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
                        <img src={coupleImg} alt="Groom and Bride" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                    </div>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="w-full flex items-center justify-center py-4 bg-[#73B5E5] z-20 flex-shrink-0">
                <p className="text-white font-pixel text-[6px] sm:text-[8px] drop-shadow-md tracking-wider">
                    Copyright <a href="https://hilmiputra.my.id" target="_blank" rel="noreferrer" className="underline hover:text-gray-200 pointer-events-auto">hilmiputra.my.id</a> 2026
                </p>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {wishToDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#EBEEEF] border-[4px] border-[#5BA4D9] shadow-[6px_6px_0_#5BA4D9] p-5 w-full max-w-[280px] flex flex-col items-center text-center font-pixel"
                        >
                            <h3 className="text-[#3e2723] text-sm sm:text-base font-bold mb-6">Hapus ucapan ini?</h3>
                            
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setWishToDelete(null)}
                                    disabled={isDeleting}
                                    className="flex-1 bg-gray-400 text-white border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] hover:bg-gray-500 py-2 text-[10px] sm:text-xs rounded active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={handleDeleteWish}
                                    disabled={isDeleting}
                                    className="flex-1 bg-[#C83B25] text-white border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] hover:bg-[#a9311e] py-2 text-[10px] sm:text-xs rounded active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                                >
                                    {isDeleting ? '...' : 'YA, HAPUS'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Photo Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            className="bg-[#f0ede8] p-4 sm:p-6 rounded-sm border-[6px] border-[#5C3A21] shadow-[8px_8px_0_#3e2723] w-full max-w-sm relative flex flex-col items-center pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute -top-5 -right-5 w-10 h-10 bg-[#C83B25] text-[#EFEABF] border-4 border-[#3e2723] rounded-full flex justify-center items-center font-pixel text-xl hover:bg-[#a9311e] z-10 shadow-[2px_2px_0_#3e2723]"
                            >
                                ×
                            </button>
                            <h3 className="font-pixel text-[#5C3A21] text-lg sm:text-xl mb-4 tracking-widest text-center mt-2">{selectedPhoto.title}</h3>
                            <div className="w-full aspect-[3/4] relative border-4 border-[#3e2723] overflow-hidden bg-[#d0c8b6] shadow-inner p-2">
                                <div className="w-full h-full border-2 border-dashed border-[#8B5A2B] p-1">
                                    <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}
