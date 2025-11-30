// src/data/jerseys.ts
import type { Product } from "./products";

export const jerseys: Product[] = [
    {
        id: "jersey-sepakbola",
        name: "SOLID Jersey Sepakbola Custom - Full printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey premium sepakbola dengan kualitas tinggi, dirancang untuk kenyamanan dan performa maksimal saat bermain sebagai tim.",
        features: [
            "Harga tercantum untuk minimum pemesanan 12 pcs (1 lusin/set)",
            "Bahan anti-keringat dan anti-bau",
            "Tekstur halus dan elastis yang nyaman",
            "Cocok digunakan untuk olahraga maupun gaya casual",
        ],
        benefits: [
            "Nyaman digunakan dalam aktivitas olahraga intens",
            "Tahan terhadap gerah dan tidak mudah lembab",
            "Tampil stylish, seragam, dan tetap fungsional",
        ],
        targetUsers: [
            "Tim sepakbola profesional maupun amatir",
            "Pelajar, mahasiswa, atau pekerja kantor yang ingin membuat tim",
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/sepakbola/001.png",
            "/products/jerseysports/sepakbola/002.png",
            "/products/jerseysports/sepakbola/003.png",
            "/products/jerseysports/sepakbola/004.png",
            "/products/jerseysports/sepakbola/005.png",
            "/products/jerseysports/sepakbola/006.png",
            "/products/jerseysports/sepakbola/007.png",
            "/products/jerseysports/sepakbola/008.png",
            "/products/jerseysports/sepakbola/009.png",
            "/products/jerseysports/sepakbola/010.png",
            "/products/jerseysports/sepakbola/011.png",
            "/products/jerseysports/sepakbola/012.png",
        ],
        variants: [
            {
                id: "ekonomis",
                color: "Ekonomis",
                colorCode: "#ef0f0fff",
                price: 1800000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/ekonomis.png",
                ],
            },
            {
                id: "polyflex",
                color: "Polyflex",
                colorCode: "rgba(249, 220, 72, 1)",
                price: 1800000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/polyflex.png",
                ],
            },
            {
                id: "fullprint",
                color: "Fullprint",
                colorCode: "#0fef52ff",
                price: 2040000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/fullprint1.png",
                ],
            },
        ],
    },
    {
        id: "jersey-basket",
        name: "SOLID Jersey Basket Custom - Full printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey basket premium full printing dengan desain custom sesuai tim kamu. Cocok untuk tim sekolah, kampus, komunitas, sampai turnamen profesional.",
        features: [
            "Harga tercantum untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Dry-Fit Premium: cepat kering, anti-bau, ringan & adem",
            "Full sublimasi (bisa full color + gradasi tanpa batas)",
            "Jahitan kuat double stitch, tahan tarikan & gesekan lapangan",
            "Free desain + revisi sampai ACC (nama, nomor, logo sponsor)",
            "Bisa tambahan celana training senam / jaket tim (optional)",
        ],
        benefits: [
            "Pemain tetap nyaman & fokus meski bertanding intens",
            "Tim tampil profesional, seragam, dan beda dari yang lain",
            "Warna & desain tidak luntur meski sering dicuci",
            "Bikin lawan langsung tahu tim kamu serius main!",
        ],
        targetUsers: [
            "Tim basket sekolah (SMA/SMP)",
            "Tim kampus & komunitas basket",
            "Club/akademi basket resmi",
            "Event organizer turnamen 3x3 atau 5x5",
            "Pemain yang mau bikin jersey couple / komunitas",
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/basket/013.png",
            "/products/jerseysports/basket/014.png",
            "/products/jerseysports/basket/015.png",
            "/products/jerseysports/basket/016.png",
            "/products/jerseysports/basket/017.png",
            "/products/jerseysports/basket/018.png",
            "/products/jerseysports/basket/019.png",
            "/products/jerseysports/basket/020.png",
            "/products/jerseysports/basket/021.png",
            "/products/jerseysports/basket/022.png",
            "/products/jerseysports/basket/023.png",
            "/products/jerseysports/basket/024.png",
        ],
        variants: [
            {
                id: "ekonomis",
                color: "Ekonomis",
                colorCode: "#ef0f0fff",
                price: 1800000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/ekonomis.png",
                ],
            },
            {
                id: "polyflex",
                color: "Polyflex",
                colorCode: "rgba(249, 220, 72, 1)",
                price: 1800000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/polyflex.png",
                ],
            },
            {
                id: "fullprint",
                color: "Fullprint",
                colorCode: "#0fef52ff",
                price: 1920000,
                weight: 960,
                images: [
                    "/products/jerseysports/sepakbola/fullprint2.png",
                ],
            },
        ],
    },
    {
        id: "jersey-voli",
        name: "SOLID Jersey Voli Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey voli premium full sublimasi dengan desain custom 100% bebas. Cocok buat tim sekolah, klub, turnamen nasional, sampai ekshibisi. Ringan, adem, dan bikin smash kamu makin ganas!",
        features: [
            "Harga untuk minimal order 12 set (1 lusin/set)",
            "Bahan Dry-Fit Premium super ringan & cepat kering",
            "Full sublimasi: desain full color, gradasi, foto tim, logo sponsor",
            "Cutting slim-fit khusus voli (gerak bebas, tidak mengganjal)",
            "Jahitan double stitch + neci rapi di area bahu & lengan",
            "Free desain + revisi sampai ACC (nama, nomor, logo)",
            "Bisa tambah celana voli, jaket tim, atau tas seragam (optional)"
        ],
        benefits: [
            "Pemain tetap nyaman & lincah sepanjang 5 set",
            "Tim tampil profesional, seragam, dan langsung keliatan beda level",
            "Warna & motif tidak luntur / retak meski sering dicuci kasar",
            "Bikin lawan langsung ciut sebelum bola di-smash!"
        ],
        targetUsers: [
            "Tim voli sekolah (SMA/SMP)",
            "Klub voli kampus & komunitas",
            "Tim Proliga / Livoli / turnamen daerah",
            "Panitia event voli tarkam & ekshibisi",
            "Pecinta voli yang mau bikin jersey couple / komunitas"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/voli/025.png",
            "/products/jerseysports/voli/026.png",
            "/products/jerseysports/voli/027.png",
            "/products/jerseysports/voli/028.png",
            "/products/jerseysports/voli/029.png",
            "/products/jerseysports/voli/030.png",
            "/products/jerseysports/voli/031.png",
            "/products/jerseysports/voli/032.png",
            "/products/jerseysports/voli/033.png",
            "/products/jerseysports/voli/034.png",
            "/products/jerseysports/voli/035.png",
            "/products/jerseysports/voli/036.png",
        ],
    },
    {
        id: "jersey-badminton",
        name: "SOLID Jersey Badminton Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey badminton premium full printing dengan cutting super ringan dan ergonomis. Dirancang khusus untuk gerakan cepat, lompat smash, defense kilat, dan rally panjang. Cocok buat klub, sekolah, sampai level PBSI.",

        features: [
            "Harga untuk minimal order 12 set (1 lusin/set)",
            "Bahan Microfiber Dry-Fit 130gsm – ultra ringan & super cepat kering",
            "Full sublimasi 360°: bebas desain, gradasi halus, logo sponsor tajam",
            "Cutting khusus badminton: lengan raglan + belahan samping biar lunge & smash leluasa",
            "Kerah V-neck rib tipis anti gerah",
            "Jahitan flat-seam di bahu & ketiak (nggak lecet meski gesek berjam-jam)",
            "Free desain + revisi sampai ACC (nama, nomor, logo klub)",
            "Bisa tambah celana pendek badminton atau wristband tim"
        ],

        benefits: [
            "Gerak tetap lincah meski main rubber game 21-19",
            "Badan tetap kering walau keringetan habis-habisan",
            "Desain & warna awet banget – nggak luntur meski dicuci tiap hari",
            "Tim langsung keliatan pro dan beda dari klub sebelah"
        ],
        targetUsers: [
            "Pemain klub rutin (Djarum, Jaya Raya, Exist, SGMB, Mutiara, dll)",
            "Tim sekolah SMA/SMP untuk POPDA, O2SN, Kejurda",
            "Atlet Pelatnas / Pra-PON / PBSI",
            "Komunitas & UKM badminton kampus",
            "Panitia turnamen open / internal / tarkam",
            "Pecinta badminton yang mau jersey couple atau komunitas"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/badminton/037.png",
            "/products/jerseysports/badminton/038.png",
            "/products/jerseysports/badminton/039.png",
            "/products/jerseysports/badminton/040.png",
            "/products/jerseysports/badminton/041.png",
            "/products/jerseysports/badminton/042.png",
            "/products/jerseysports/badminton/043.png",
            "/products/jerseysports/badminton/044.png",
            "/products/jerseysports/badminton/045.png",
            "/products/jerseysports/badminton/046.png",
            "/products/jerseysports/badminton/047.png",
            "/products/jerseysports/badminton/048.png",
        ],
    },
    {
        id: "jersey-sepeda",
        name: "SOLID Jersey Sepeda Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey sepeda premium full sublimasi dengan cutting aero & ergonomis. Dirancang khusus untuk posisi riding agresif, tanjakan panjang, sprint, sampai touring ratusan kilo. Ringan, anti angin, dan bikin tim kamu keliatan pro di jalanan.",

        features: [
            "Harga untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Italian Lycra 140–160gsm – super elastis, adem, cepat kering",
            "Full sublimasi 360°: desain bebas, gradasi tajam, logo sponsor nempel kuat",
            "Cutting race-fit aero + lengan raglan panjang (opsional pendek)",
            "3 kantong belakang jumbo + zipper pocket anti air",
            "Gripper silikon di lengan & pinggang (nggak naik meski posisi dropbar)",
            "Free desain + revisi sampai ACC (nama, logo tim, sponsor)",
            "Bisa tambah bib shorts / celana padding, arm warmer, atau windbreaker tim"
        ],

        benefits: [
            "Tetap kering & nyaman meski gowes 100 km+ di panas terik",
            "Reduksi drag & angin – ngejar KOM jadi lebih gampang",
            "Desain & warna awet banget – nggak luntur meski sering kena hujan & matahari",
            "Tim langsung keliatan solid & pro di setiap event atau weekend ride"
        ],

        targetUsers: [
            "Komunitas sepeda balap (road bike) & gravel",
            "Tim club gowes mingguan (Polygon, Thrill, United, Pacific, dll)",
            "Peserta event granfondo, tour de, atau century ride",
            "Atlet balap sepeda daerah / nasional",
            "Goweser kampus & kantor yang mau bikin jersey couple",
            "Brand ambassador atau sponsor yang mau seragam tim"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/sepeda/049.png",
            "/products/jerseysports/sepeda/050.png",
            "/products/jerseysports/sepeda/051.png",
            "/products/jerseysports/sepeda/052.png",
            "/products/jerseysports/sepeda/053.png",
            "/products/jerseysports/sepeda/054.png",
            "/products/jerseysports/sepeda/055.png",
            "/products/jerseysports/sepeda/056.png",
            "/products/jerseysports/sepeda/057.png",
            "/products/jerseysports/sepeda/058.png",
            "/products/jerseysports/sepeda/059.png",
            "/products/jerseysports/sepeda/060.png",
        ],
    },
    {
        id: "jersey-motocross",
        name: "SOLID Jersey Motocross Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey motocross premium full sublimasi dengan bahan ventilated & tahan robek. Dirancang khusus buat rider yang suka lompat besar, cornering agresif, dan balapan full lap di trek tanah/lumpur. Anti panas, anti sobek, dan bikin nomor start kamu keliatan gila!",

        features: [
            "Harga untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Polyester Mesh 180gsm + panel ventilated di ketiak & punggung",
            "Full sublimasi 360°: desain bebas, logo sponsor tajam, warna nggak luntur kena lumpur",
            "Cutting longgar khas MX + lengan panjang anti lecet ranting",
            "Stretch panel di siku & bahu biar gerak full range",
            "Cuff lengan lebar + tail silikon panjang (nggak naik pas lompat)",
            "Free desain + revisi sampai ACC (nomor, nama, logo tim/sponsor)",
            "Bisa sekalian bikin celana cross, glove, atau apparel pit crew"
        ],
        benefits: [
            "Tetap adem meski balapan 30 menit + 2 moto di terik",
            "Jersey nggak sobek meski sering kena ranting, jatuh, atau gesek ban",
            "Warna & desain tetap gonjreng meski sering kena lumpur + bensin",
            "Tim langsung keliatan pro & siap podium di setiap event"
        ],

        targetUsers: [
            "Rider grasstrack, motocross, enduro, dan supermoto",
            "Tim balap daerah / nasional (IMX, OnePrix Cross, dll)",
            "Komunitas trail & adventure (KLX, CRF, WR, YZ community)",
            "Event organizer grasstrack tarkam & kejurda",
            "Pit crew & mekanik yang mau seragam tim",
            "Anak muda yang suka gaya motocross buat harian"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/motocross/061.png",
            "/products/jerseysports/motocross/062.png",
            "/products/jerseysports/motocross/063.png",
            "/products/jerseysports/motocross/064.png",
            "/products/jerseysports/motocross/065.png",
            "/products/jerseysports/motocross/066.png",
            "/products/jerseysports/motocross/067.png",
            "/products/jerseysports/motocross/068.png",
            "/products/jerseysports/motocross/069.png",
            "/products/jerseysports/motocross/069.png",
            "/products/jerseysports/motocross/070.png",
            "/products/jerseysports/motocross/071.png",
        ],
    },
    {
        id: "jersey-running",
        name: "SOLID Jersey Running Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey running premium full sublimasi ultra-ringan & breathable. Dirancang khusus buat lari jarak jauh, tempo run, interval, sampai race marathon/full marathon. Bikin napas enteng, badan kering, dan pace kamu makin ngegas!",
        features: [
            "Harga untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Italian Dry-Tech 115–130gsm – super ringan & anti bau",
            "Full sublimasi 360°: desain bebas, logo sponsor tajam, warna gonjreng",
            "Cutting race-fit + side mesh panel untuk sirkulasi udara maksimal",
            "Flatlock seam anti-iritasi (nggak lecet meski lari 42K)",
            "Reflective strip di depan & belakang (aman buat night run)",
            "Free desain + revisi sampai ACC (nama, logo komunitas, flag negara)",
            "Bisa tambah singlet, tank top, arm sleeve, atau race belt tim"
        ],
        benefits: [
            "Tetap kering & adem meski lari di bawah terik jam 9 pagi",
            "Bobot super enteng – nggak kerasa pake apa-apa pas ngejar PB",
            "Warna & desain awet – nggak pudar meski dicuci puluhan kali",
            "Komunitas langsung keliatan solid & pro di setiap event lari"
        ],
        targetUsers: [
            "Komunitas lari (Indorunners, Bandung Runners, Jakarta Runners, dll)",
            "Pelari amatir yang ngejar sub-4, sub-3, atau full marathon",
            "Tim kantor buat corporate run & charity run",
            "Peserta Borobudur Marathon, Bromo Marathon, Bali Marathon, dll",
            "Runner kampus & sekolah buat fun run atau lomba antar fakultas",
            "Brand & sponsor yang mau seragam tim pace maker / sweeper"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/running/073.png",
            "/products/jerseysports/running/074.png",
            "/products/jerseysports/running/075.png",
            "/products/jerseysports/running/076.png",
            "/products/jerseysports/running/077.png",
            "/products/jerseysports/running/078.png",
            "/products/jerseysports/running/079.png",
            "/products/jerseysports/running/080.png",
            "/products/jerseysports/running/081.png",
            "/products/jerseysports/running/082.png",
            "/products/jerseysports/running/083.png",
            "/products/jerseysports/running/084.png",
        ],
    },
    {
        id: "jersey-mancing",
        name: "SOLID Jersey Mancing Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey mancing premium full sublimasi dengan ventilasi gila + quick dry. Dirancang buat mancing seharian di laut terbuka, waduk, atau galatama. Anti gerah, anti bau amis, anti silau matahari, dan bikin tim kamu keliatan paling keren di spot!",
        features: [
            "Harga untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Polyester Cooling Mesh 140gsm + UPF 50+ anti UV",
            "Full sublimasi 360°: desain bebas (camo, ikan monster, logo tim, sponsor)",
            "Ventilasi ekstra besar di ketiak & punggung (adem meski terik 38°C)",
            "Kerah tinggi + zipper ¼ (bisa dibuka pas panas, nutup pas angin laut)",
            "2 kantong dada ber-resleting anti air (buat HP, umpan, korek)",
            "Lengan panjang dengan thumb-hole + cuff anti melorot",
            "Free desain + revisi sampai ACC (nama, nickname, logo komunitas)"
        ],
        benefits: [
            "Tetap kering & nggak bau amis meski kena cipratan air laut + darah ikan",
            "Terlindung dari matahari ganas & angin laut seharian",
            "Warna & motif tetap gonjreng meski sering kena umpan + air laut",
            "Tim langsung keliatan solid & pro di setiap spot mancing"
        ],
        targetUsers: [
            "Komunitas mancing mania (Mancing Mania, Galatama Predator, Laut Lepas)",
            "Tim mancing galatama harian/malam (lele, patin, bawal, gabus)",
            "Angler laut (popping, jigging, casting GT, tenggiri)",
            "Peserta lomba mancing kilat, mancing mania trans 7, atau event nasional",
            "Mancing youtuber & content creator yang butuh jersey kece",
            "Sponsor umpan/reel yang mau seragam tim"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/mancing/085.png",
            "/products/jerseysports/mancing/086.png",
            "/products/jerseysports/mancing/087.png",
            "/products/jerseysports/mancing/088.png",
            "/products/jerseysports/mancing/089.png",
            "/products/jerseysports/mancing/090.png",
            "/products/jerseysports/mancing/091.png",
            "/products/jerseysports/mancing/092.png",
            "/products/jerseysports/mancing/093.png",
            "/products/jerseysports/mancing/094.png",
            "/products/jerseysports/mancing/095.png",
            "/products/jerseysports/mancing/096.png",
        ]
    },
    {
        id: "jersey-esport",
        name: "SOLID Jersey Esport Custom – Full Printing",
        category: "Jersey Sports",
        price: 2400000,
        discountPrice: 1800000,
        currency: "IDR",
        weight: 960,
        description:
            "Jersey esports premium full sublimasi dengan breathable mesh + desain gaming brutal. Dirancang buat marathon turnamen, grinding rank, streaming 24 jam. Anti gerah, anti lengket keyboard, dan bikin tim kamu keliatan pro di MPL, PMGC, atau VCT!",
        features: [
            "Harga untuk minimal order 12 pcs (1 lusin/set)",
            "Bahan Gaming Tech Mesh 140gsm + anti statis (nggak nempel debu keyboard)",
            "Full sublimasi 360°: desain RGB glow, logo tim, sponsor (EVOS, RRQ, Alter Ego)",
            "Ventilasi laser-cut di punggung & samping (adem meski AC 16°C + stress loss)",
            "Zipper full depan + hood optional (bisa dipake pas offline scrim)",
            "2 kantong samping ber-zip (buat mousepad mini, energy drink, atau snack)",
            "Lengan raglan + thumb-hole (nyaman pegang mouse & keyboard berjam-jam)",
            "Free desain + revisi sampai ACC (ID gamer, rank, logo clan)"
        ],
        benefits: [
            "Tetap kering & fresh meski grinding 12 jam nonstop qualifier",
            "Gerak tangan bebas – nggak ribet pas clutch 1v5",
            "Warna & grafis tetap glowing meski sering kena flash kamera stream",
            "Tim langsung keliatan solid & pro di setiap tournament atau content"
        ],
        targetUsers: [
            "Tim esports pro (Mobile Legends, PUBG Mobile, Free Fire, Valorant)",
            "Content creator & streamer Twitch/YouTube Gaming",
            "Komunitas grinding rank (MPL Academy, PMPL, VCT Challengers)",
            "Peserta turnamen kampus / open qualifier nasional",
            "Clan & guild yang mau jersey couple untuk scrim/event",
            "Sponsor game/device yang butuh apparel tim"
        ],
        notes:
            "DP 70% saat desain ACC, pelunasan sebelum pengiriman. Estimasi pengerjaan 3-5 hari kerja setelah desain fix.",
        images: [
            "/products/jerseysports/esport/097.png",
            "/products/jerseysports/esport/098.png",
            "/products/jerseysports/esport/099.png",
            "/products/jerseysports/esport/100.png",
            "/products/jerseysports/esport/100.png",
            "/products/jerseysports/esport/101.png",
            "/products/jerseysports/esport/102.png",
            "/products/jerseysports/esport/103.png",
            "/products/jerseysports/esport/104.png",
            "/products/jerseysports/esport/105.png",
            "/products/jerseysports/esport/106.png",
            "/products/jerseysports/esport/107.png",
        ]
    }
];