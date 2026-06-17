import { Language, NewsItem, SchoolEvent, TeacherProfile, ClubInfo } from './types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav Bar
    brand: "Wisdom Academy",
    home: "Home",
    about: "About Us",
    academics: "Academics",
    admissions: "Admissions",
    studentLife: "Student Life",
    faculty: "Faculty & Staff",
    newsEvents: "News & Events",
    gallery: "Virtual Campus",
    contact: "Contact Us",
    portalLogin: "System Portal",
    applyNow: "Enroll Now",
    
    // Core buttons & UI
    search: "Search content...",
    filterAll: "All Categories",
    send: "Submit Form",
    viewMore: "Learn More",
    accept: "Approve",
    reject: "Reject",
    pending: "Pending Review",
    reviewing: "Under Audit",
    approved: "Approved",
    rejected: "Declined",
    
    // Home Page Hero / Slides
    heroTagline: "Nurturing Global Visionaries, Elite Leaders & Scholar Minds",
    heroSub: "Wisdom Academy establishes a gold standard in East African education, combining rigorous Cambridge IGCSE and A-Levels with the National Ethiopian curriculum, state-of-the-art innovation centers, and rich local cultural heritage.",
    exploreCampus: "Explore Virtual Campus",
    scheduleTour: "Request Private Tour",
    
    // Welcomes
    principalTitle: "Principal's Keynote Message",
    principalName: "Dr. Abraham Tadesse, Ph.D.",
    principalMessage: "Welcome to Wisdom Academy. It is indeed a profound honor to lead an educational community here in Addis Ababa where high intellectual curiosity meets character building. Our pedagogy prepares students to excel in national ESSLCE exams alongside international Cambridge A-Levels, empowering them to redefine global industries, champion scientific discoveries, and govern with high ethics in an interconnected world.",

    // Statistics
    statsTitle: "Wisdom Hub by the Numbers",
    statsSub: "Decades of educational excellence, shaping world changers and pioneering future pathways in Ethiopia.",
    statsLabel1: "Student-Teacher Ratio",
    statsLabel2: "Ivy-League & AAU admissions",
    statsLabel3: "Championship Sports & Arts Clubs",
    statsLabel4: "National Exam Score Average",

    // Why Choose Us
    whyTitle: "The Pillars of Wisdom Distinction",
    whySub: "Why the world's most visionary parents entrust their children's education to our care.",
    pillar1Title: "Dual-Curriculum Mastery",
    pillar1Desc: "Access both world-renowned Cambridge IGCSE / A-Levels and the rigorous National Ethiopian STEM frameworks for top tier pre-university preparation.",
    pillar2Title: "Global Innovation Labs",
    pillar2Desc: "Students design tomorrow using advanced AI workstations, biological research labs, robotics kits, and digital design suites.",
    pillar3Title: "Elite Athletics & Kirar Fusion",
    pillar3Desc: "Our campus boasts championship athletic speed training, traditional musical art ensembles, and professional coaching staffs.",
    pillar4Title: "Ethical Character Leadership",
    pillar4Desc: "We cultivate visionary critical thinking, high empathetic community activism, and strong diplomatic leadership attributes.",
    
    // Admissions
    admitTitle: "Your Extraordinary Journey Starts Here",
    admitSub: "Complete the online enrollment engine to request verification from our registrar's division.",
    instructions: "Evaluation Steps",
    step1: "1. Complete Application Form online",
    step2: "2. Upload Transcripts & Personal Essay",
    step3: "3. Schedule Entrance Competency Exam",
    step4: "4. Digital ID Verification and Enrollment Approval",
    feeStructure: "Approved Term Fee Matrix",
    tuitionFee: "Tuition Fee (Annually)",
    regFee: "One-Time Registration Cost",
    labFee: "Research & Technology Lab Surcharge",
    activityFee: "Student Activities & Society Dues",
    scholarshipInfo: "Merit-Based Scholarships & Grants",
    scholarshipSub: "Wisdom awards generous endowment scholarships coverages (ranging from 25% to 100% of academic fees) to ultra-gifted academic minds, national athletes, and exceptional young coding visionaries."
  },
  am: {
    // Nav Bar
    brand: "ዊዝደም አካዳሚ",
    home: "መነሻ",
    about: "ስለ እኛ",
    academics: "አካዳሚክስ",
    admissions: "መግቢያ",
    studentLife: "ተማሪ ሕይወት",
    faculty: "መምህራን እና ሰራተኞች",
    newsEvents: "ዜና እና ክስተቶች",
    gallery: "ምናባዊ ግቢ",
    contact: "እውቂያ",
    portalLogin: "የሲስተም ፖርታል",
    applyNow: "በመስመር ላይ ያመልክቱ",
    
    // Core buttons & UI
    search: "ይፈልጉ...",
    filterAll: "ሁሉም ዘርፎች",
    send: "ፎርሙን አስገባ",
    viewMore: "ተጨማሪ ያንብቡ",
    accept: "አጽድቅ",
    reject: "ውድቅ አድርግ",
    pending: "በመጠባበቅ ላይ",
    reviewing: "በግምገማ ላይ",
    approved: "ጸድቋል",
    rejected: "ውድቅ ተደርጓል",
    
    // Home Page Hero / Slides
    heroTagline: "አለም አቀፍ ባለራዕዮችን፣ ታላላቅ መሪዎችን እና ምሁራንን እናፈራለን",
    heroSub: "ዊዝደም አካዳሚ አለም አቀፍ የካምብሪጅ እና የኢትዮጵያ ብሄራዊ ስርአተ-ትምህርቶችን ከዘመናዊ የምርምር ማዕከላት፣ ታላላቅ የስፖርት እና የኪነ-ጥበብ ክለቦች እና ጥልቅ ባህላዊ እሴቶች ጋር በማጣመር የትምህርት ጥራት መለኪያ ሆኖ ያገለግላል።",
    exploreCampus: "ምናባዊ ግቢውን ይጎብኙ",
    scheduleTour: "የግል ጉብኝት ይጠይቁ",
    
    // Welcomes
    principalTitle: "የርዕሰ መምህሩ መልእክት",
    principalName: "ዶ/ር አብርሃም ታደሰ፣ ፒኤችዲ",
    principalMessage: "ወደ ዊዝደም አካዳሚ በደህና መጡ። እዚህ አዲስ አበባ ውስጥ ከፍተኛ የአዕምሮ ዝግጁነት እና የስብዕና ግንባታ የሚገናኙበትን የትምህርት ማህበረሰብ መምራት ታላቅ ክብር ነው። የእኛ ጠንካራ የሁለትዮሽ ስርዓተ-ትምህርት ተማሪዎችን ለኢትዮጵያ ብሄራዊ ፈተናዎች እና ለካምብሪጅ ኤ-ሌቭልስ ፈተና ጥሩ ውጤት ለማስመዝገብ ብቻ ሳይሆን የሳይንሳዊ ግኝቶች ፈጣሪዎች እና በስነ ምግባር የታነጹ መሪዎች እንዲሆኑ ያዘጋጃቸዋል።",

    // Statistics
    statsTitle: "ዊዝደም በቁጥር",
    statsSub: "በአስርተ አመታት ውስጥ የላቀ የትምህርት ጥራት፣ አለምን የሚቀይሩ መሪዎችን እና የወደፊቱን ጎዳና በኢትዮጵያ ውስጥ እየቀረጽን ነው።",
    statsLabel1: "የተማሪ-መምህር ጥምርታ",
    statsLabel2: "የዩኒቨርሲቲ እና የአ.አ.ዩ ምደባዎች",
    statsLabel3: "የአርት እና የስፖርት ክበባት",
    statsLabel4: "የሀገር አቀፍ አማካይ ውጤት",

    // Why Choose Us
    whyTitle: "የዊዝደም ልዩነት ምሶሶዎች",
    whySub: "ባለራዕይ ወላጆች የልጆቻቸውን ትምህርት ለእኛ የሚያስረክቡበት የምክንያቶች ስብስብ።",
    pillar1Title: "ሁለንተናዊ ስርአተ-ትምህርት",
    pillar1Desc: "ባለ ሁለትዮሽ የካምብሪጅ IGCSE / A-Levels እና ጠንካራ የሀገር አቀፍ የSTEM ስርአተ-ትምህርትን ያካተተ የተሟላ የዩኒቨርሲቲ ቅድመ ዝግጅት።",
    pillar2Title: "የፈጠራ ቤተ-ሙከራዎች",
    pillar2Desc: "ተማሪዎች ከፍተኛ የኤአይ (AI) የስራ ጣቢያዎችን፣ የባዮሎጂካል ምርምር ክፍሎችን እና የሮቦቲክስ ማዕከላትን በመጠቀም ነገን ይቀርፃሉ።",
    pillar3Title: "የአትሌቲክስ እና የክራር ውህደት",
    pillar3Desc: "የኦሎምፒክ ደረጃ የአትሌቲክስ ስልጠናዎችን፣ የባህል ጥበብ እና የክራር ሙዚቃ አዳራሾችን እንዲሁም በታወቁ አሰልጣኞች የታገዙ የስፖርት ማዕከላትን ያካትታል።",
    pillar4Title: "የስነ-ምግባር አመራር ባህል",
    pillar4Desc: "ተማሪዎቻችን በሂስዊ አስተሳሰብ፣ ለህብረተሰብ አሳቢነት እና ጠንካራ የዲፕሎማሲ ክህሎትን እንዲያዳብሩ እናደርጋለን።",

    // Admissions
    admitTitle: "የእርስዎ ልዩ ጉዞ እዚህ ይጀምራል",
    admitSub: "ወደ ትምህርት ቤታችን ለመቀላቀል እና ከሬጅስትራር ክፍል ማረጋገጫ ለማግኘት የመስመር ላይ ምዝገባውን ያጠናቅቁ።",
    instructions: "የመገምገሚያ ቅደም ተከተሎች",
    step1: "1. የማመልከቻ ቅጹን በመስመር ላይ ያጠናቅቁ",
    step2: "2. የትምህርት መረጃዎችን እና ድርሰትን ያስገቡ",
    step3: "3. የመግቢያ ብቃት ፈተና ቀጠሮ ይያዙ",
    step4: "4. ዲጂታል መታወቂያ ማረጋገጫ እና የምዝገባ ፈቃድ",
    feeStructure: "የተፈቀደው የክፍያ ስርአት",
    tuitionFee: "የዓመት የትምህርት ክፍያ",
    regFee: "የአንድ ጊዜ ምዝገባ ክፍያ",
    labFee: "የምርምር እና ቴክኖሎጂ ላብራቶሪ ክፍያ",
    activityFee: "የተማሪዎች ክበብ እና እንቅስቃሴዎች ክፍያ",
    scholarshipInfo: "የብቃት ማበረታቻ ስኮላርሺፖች",
    scholarshipSub: "ዊዝደም ልዩ ለሆኑ ተማሪዎች፣ ምርጥ አትሌቶች እና ወጣት ፈጣሪ ኮደሮች ከ25% እስከ 100% ሙሉ የትምህርት ዕድል (ስኮላርሺፕ) ያበረክታል።"
  },
  om: {
    // Nav Bar
    brand: "Akkaadaamii Wisdom",
    home: "Ka'umsa",
    about: "Waa'ee Keenya",
    academics: "Barnoota",
    admissions: "Seensa",
    studentLife: "Jireenya Barattootaa",
    faculty: "Barsiisota & Hojjattoota",
    newsEvents: "Oduu & Sagantaalee",
    gallery: "Wiirtuu Virtual",
    contact: "Qunnamtii",
    portalLogin: "Seensa Sirnaa",
    applyNow: "Garuu Galmaa'i",
    
    // Core buttons & UI
    search: "Barbaadi...",
    filterAll: "Ramaddii Hundumaa",
    send: "Oofii Ergama",
    viewMore: "Dabalata Dubbisi",
    accept: "Mirkaneessi",
    reject: "Kuffisi",
    pending: "Eegamaa Jira",
    reviewing: "Madaalamaa Jira",
    approved: "Mirkanaa'e",
    rejected: "Kufaa Ta'e",
    
    // Home Page Hero / Slides
    heroTagline: "Dhaloota Mul'ata Qaban, Giddu-Galeessa Ogummaa & Geggeessitoota Kunuunsina",
    heroSub: "Akkaadaamiin Kitaabaa Wisdom qulqullina barnoota addunyaa, sirna barnoota Cambridge fi biyyaalessaa walitti makuun, giddu-galeessota saayinsii, ispoortii cimaa fi aadaa badhaadhaan walitti makuun sadarkaa ifaa agarsiisa.",
    exploreCampus: "Wiirtuu Virtual Daawwadhu",
    scheduleTour: "Daawwannaa Dhuunfaa Gaafadhu",
    
    // Welcomes
    principalTitle: "Ergaa Dura-Bu'aa",
    principalName: "Dr. Abirahaam Taaddasaa, Ph.D.",
    principalMessage: "Gara Wisdom Academy tti baga nagaan dhuftan. Finfinnee keessatti wiirtuu barnootaa qorannaa sammuu olaanaafi ijaarama amalootaa walitti fidu hogganuun koo kabaja guddaadha. Pedagojiin keenya barattoona qormaata biyyoolessaa (ESSLCE) fi Cambridge A-Levels qabxii olaanaan akka goonfatan gargaara.",

    // Statistics
    statsTitle: "Wisdom Kaalculatorootaan",
    statsSub: "Waggoota hedduu qulqullina barnootaa keessatti, jijjiirtoota addunyaafi daandii fulduraa Itiyoophiyaa keessatti qorachaa jirra.",
    statsLabel1: "Reeshiyo Barsiisaa-Barataa",
    statsLabel2: "Seensa Ivy-League & AAU",
    statsLabel3: "Mo'atoota Ispoortii & Kilaaboota Aartii",
    statsLabel4: "Giddugaleessa Qabxii Biyyoolessaa",

    // Why Choose Us
    whyTitle: "Utubaa Addunyaa Wisdom",
    whySub: "Sababa warri mul'ata qaban barnoota ijoollee isaanii nuuf kennaniif.",
    pillar1Title: "Sirna Barnoota Addaa",
    pillar1Desc: "Sirna barnoota Cambridge IGCSE / A-Levels bebbeekamoo fi National STEM Modules walitti hidhame pre-university hojmataa mijeessu.",
    pillar2Title: "Laboratoorii Saayinsii & AI",
    pillar2Desc: "Barattoonni AI workstations, biological cleanrooms, fi robotics faayidaarra oolchuun boru hojjetu.",
    pillar3Title: "Walitti-fufiinsa Atleetiksii & Kirar",
    pillar3Desc: "Wiirtuu keenya keessatti leenjii fiigichaa cimaa, konservatshinii muuziqaa aadaa, fi leenjistoota dharraa qaban argattu.",
    pillar4Title: "Geggeessummaa Amalaa Haqa",
    pillar4Desc: "Barattoonni critical thinking cimaa, qooda fudhannaa hawaasummaa empatiin dhufe fi dandeettii dippilomaasii akka gabbifatan goona.",

    // Admissions
    admitTitle: "Deemsi Keessan Inni Addaa Asitti Jalqaba",
    admitSub: "Sirna galmee toora interneetii keenya dhumuun beeksisa seensaa Registrar biraa fudhadhaa.",
    instructions: "Tarkaanfiiwwan Madaallii",
    step1: "1. Unka application toora interneetiitti guuti",
    step2: "2. Dokumentiiwwan barnootaa & barreeffama dhuunfaa galchi",
    step3: "3. Qormaata madaallii seensaa saganteessi",
    step4: "4. Mirkaneessa ID dijiitaalaa fi hayyama seensaa",
    feeStructure: "Kaffaltii Barnootaa Mirkanaa'e",
    tuitionFee: "Kaffaltii Barumsaa (Waggaatti)",
    regFee: "Kaffaltii Galmee Al-tokkoo",
    labFee: "Kaffaltii Laboratoorii Teeknoolojii",
    activityFee: "Hojiiwwan barattootaa & Dues Maamiltootaa",
    scholarshipInfo: "Iskoolaashiippii Merit Irratti Hundaa'e",
    scholarshipSub: "Wisdom barattoota dandeettii addaa qaban, atleetota biyyaalessaa fi dandeettii koodingii qaban hundaaf carraa barnootaa (25% hanga 100% full scholarship) ni kenna."
  }
};

export const STATISTICS = [
  { value: "8:1", key: "statsLabel1", color: "from-amber-500 to-yellow-600" },
  { value: "98.4%", key: "statsLabel2", color: "from-emerald-500 to-teal-600" },
  { value: "15+", key: "statsLabel3", color: "from-blue-500 to-indigo-600" },
  { value: "99.1", key: "statsLabel4", color: "from-purple-500 to-pink-600" }
];

export const PILLARS = [
  { key: 1, icon: "Award", titleKey: "pillar1Title", descKey: "pillar1Desc" },
  { key: 2, icon: "Cpu", titleKey: "pillar2Title", descKey: "pillar2Desc" },
  { key: 3, icon: "Music", titleKey: "pillar3Title", descKey: "pillar3Desc" },
  { key: 4, icon: "Heart", titleKey: "pillar4Title", descKey: "pillar4Desc" }
];

export const TEACHERS: TeacherProfile[] = [
  {
    id: "t1",
    name: "Dr. Abraham Tadesse, Ph.D.",
    role: {
      en: "Headmaster & Senior Lecturer in Ethics",
      am: "ርዕሰ መምህር እና የስነ-ምግባር ከፍተኛ መምህር",
      om: "Dura-Bu'aa & Barsiisaa Olaanaa Barnoota Amalaa"
    },
    qualification: {
      en: "Ph.D. in Educational Admin, Addis Ababa University & Oxford",
      am: "ፒኤችዲ በትምህርት አመራር፣ አዲስ አበባ ዩኒቨርሲቲ እና ኦክስፎርድ ዩኒቨርሲቲ",
      om: "Ph.D. in Educational Admin, Addis Ababa University & Oxford University"
    },
    department: "Humanities",
    imageUrl: "/src/assets/images/ethiopian_principal_portrait_1781712414112.jpg",
    bio: {
      en: "Devoted to school leadership in East Africa, counseling the next generation on educational integrity and A-Level standards.",
      am: "በምስራቅ አፍሪካ የትምህርት አመራር ላይ 22 አመታትን ያገለገሉ እና ቅድመ ዩኒቨርሲቲ ስርዓተ-ትምህርቶችን ያዘጋጁ።",
      om: "Geggeessummaa addunyaa irratti waggaa 22 tajaajile fi sirna barnootaa qopheessee jira."
    }
  },
  {
    id: "t2",
    name: "Dr. Senait Bekele",
    role: {
      en: "Head of Sciences & Biotech Lead",
      am: "የምርምርና ሳይንስ ክፍል ኃላፊ",
      om: "Hogganaa Saayinsii & Biotech Lead"
    },
    qualification: {
      en: "Ph.D. in Molecular Biology, MIT",
      am: "ፒኤችዲ በሞለኪውላር ባዮሎጂ፣ ኤምአይቲ (MIT)",
      om: "Ph.D. in Molecular Biology, MIT"
    },
    department: "Sciences",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: {
      en: "Former researcher at the Broad Institute, counseling students on state-of-the-art biological pathways.",
      am: "በአይቪሊግ ከፍተኛ ተቋማት ውስጥ ተመራማሪ የነበሩ፣ ተማሪዎችን በምርምር ስራ ላይ የሚያግዙ።",
      om: "Broad Institute keessatti qorattuu kan turte, barattoota saayinsii mijeessiti."
    }
  },
  {
    id: "t3",
    name: "Ato Lulseged Mengesha, M.Sc.",
    role: {
      en: "Director of Digital Innovation & Coding Systems",
      am: "የዲጂታል ኢኖቬሽን እና ኮዲንግ ዳይሬክተር",
      om: "Daarektara Dijitaala Inoveeshinii & Koondingii"
    },
    qualification: {
      en: "M.Sc. in Computer Science, Stanford University",
      am: "ማስተርስ በኮምፒውተር ሳይንስ፣ ስታንፎርድ ዩኒቨርሲቲ",
      om: "M.Sc. in Computer Science, Stanford University"
    },
    department: "Mathematics",
    imageUrl: "/src/assets/images/ethiopian_teacher_lulseged_1781712431161.jpg",
    bio: {
      en: "Architect of our robotics course. Guided 4 student teams to regional coding victory summits.",
      am: "የትምህርት ቤታችን የሮቦቲክስ ፈጣሪ፣ አራት የተማሪ ቡድኖችን በአለም አቀፍ ውድድር ላይ ያሸነፉ።",
      om: "Sirna robotics keenya kan mijeesse. Barattoota gootota gubbaadhaan koodingii addunyaatti dhumse."
    }
  },
  {
    id: "t4",
    name: "Woyzero Aster Assefa, M.A.",
    role: {
      en: "Head of Languages & Ethiopian Studies",
      am: "የቋንቋዎችና የኢትዮጵያ ጥናት ክፍል ኃላፊ",
      om: "Hogganaa Qooqawwanii & Qo'annoo Itiyoophiyaa"
    },
    qualification: {
      en: "M.A. in Linguistics, Addis Ababa University",
      am: "ማስተርስ በሊንግዊስቲክስ፣ አዲስ አበባ ዩኒቨርሲቲ",
      om: "M.A. in Linguistics, Univ. Finfinnee"
    },
    department: "Languages",
    imageUrl: "/src/assets/images/ethiopian_teacher_aster_1781712445330.jpg",
    bio: {
      en: "Dedicated to nurturing cultural heritage through Amharic, Afaan Oromo, and Ethiopian history modules alongside English.",
      am: "ባህላዊ እሴቶችን፣ የአማርኛ፣ የኦሮሚኛ እና የእንግሊዘኛ ቋንቋዎችን ለተማሪዎች በማስተማር ላይ የ 15 አመት ልምድ ያላቸው።",
      om: "Aadaafi afaan Itiyoophiyaa (Afaan Oromoo, Amaraafi Ingliffa) tajaajila barattootaaf guddisuuf gooti."
    }
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    title: {
      en: "Wisdom Wins National Innovation Award at Science and Robotics Summit",
      am: "ዊዝደም በአገር አቀፍ የሳይንስና የሮቦቲክስ ጉባኤ ላይ የወርቅ ሜዳሊያ አሸነፈ",
      om: "Wisdom dorgommii Saayinsii fi Robotics Biyyoolessaa irratti Okkotee Warqee Mo'ate"
    },
    category: "achievement",
    summary: {
      en: "Our robotics group designs fully automated AI agricultural sensors and exploration rovers completing standard obstacle circuits.",
      am: "የሮቦቲክስ የምርምር ቡድናችን የግብርና ኤአይ ሴንሰሮችን እና መሰናክሎችን በአጭር ጊዜ ማለፍ የሚችል ሙሉ በሙሉ ራሱን የቻለ ኤአይ ሮቨር ሰርቷል።",
      om: "Kilaabiin Robotics keenya rover AI ofiin deemu kan koochoo saayinsii mijeessu omishee dhumseera."
    },
    content: {
      en: "The Academy's elite Robotics team represented our school and secured 1st place in the autonomous systems division. Standard scores in testing matched the top technological institutions internationally. The students integrated advanced computer vision concepts using deep learning architecture compiled during their weekend club activities.",
      am: "የአካዳሚው ከፍተኛ የሮቦቲክስ ቡድን በኢኮኖሚክስ እና ፈጠራ ውድድር ላይ ትምህርት ቤታችንን በመወከል ረገድ በአውቶኖመስ ሲስተምስ አንደኛ ደረጃን አግኝቷል። ተማሪዎች በሳምንቱ መጨረሻ ክበባት የሰሩትን የኮምፒውተር ቪዥን ቴክኖሎጂን ተጠቅመዋል።",
      om: "Akkaadaamiin keenya Robotics Munich irratti gootota addunyaa ta'anii dhumani. Barattoonni teeknoolojii computer vision ragaalee deep learning fayyadamanii mul'atani."
    },
    date: "2026-06-10",
    imageUrl: "/src/assets/images/ethiopian_school_science_lab_1781712327357.jpg",
    author: "Admissions & Tech Media"
  },
  {
    id: "n2",
    title: {
      en: "Announcing Academic Year Scholarships for Outstanding Scholars",
      am: "ልዩ ብቃት ላላቸው ተማሪዎች የተሟላ የነፃ ትምህርት ዕድል (ስኮላርሺፕ) ተጀመረ",
      om: "Iskoolaashiippii guutuu barattoota dandeettii addaa qabaniif beeksifame"
    },
    category: "admission",
    summary: {
      en: "Wisdom awards up to 100% tuition coverage for top performers, athletes, and coding minds.",
      am: "ዊዝደም ከፍተኛ ውጤት ላስመዘገቡ ተማሪዎች፣ አትሌቶች እና የኮዲንግ ባለሙያዎች እስከ 100% የነፃ ትምህርት እድል ይሰጣል።",
      om: "Wisdom barattoota dandeettii addaa qabaniif iskoolaashiippii guutuu kaffala."
    },
    content: {
      en: "We are thrilled to launch our annual merit-based scholarship fund, designed to support exceptional talents key to engineering national and international breakthroughs. Applications are now open at the Registrar's portal.",
      am: "ለመላው የአገራችን ተማሪዎች ምቹ የሆነ የልህቀት እና የነጻ ትምህርት እድል ሰፊ በጀት ተዘጋጅቶ በምዝገባ ወቅት ይፋ ሆኗል።",
      om: "Carraan kun barattoota gaariin milkaa'an hundaaf mijeessuf kan qophaaye dha."
    },
    date: "2026-06-15",
    imageUrl: "/src/assets/images/ethiopian_students_classroom_1781712311463.jpg",
    author: "Office of the Vice Principal"
  }
];

export const EVENTS: SchoolEvent[] = [
  {
    id: "e1",
    title: {
      en: "Annual Biotech Exploration & STEM Fair",
      am: "ዓመታዊ የባዮቴክ እና የሳይንስ አውደ-ርዕይ",
      om: "Agarsiisa STEM & Biotech Waggaa"
    },
    date: "2026-07-24",
    time: "09:00 AM - 04:00 PM",
    location: {
      en: "Selamawit Biology & Science Labs",
      am: "በሰላማዊት ሳይንስ ላቦራቶሪ",
      om: "Laboratoorii Saayinsii Selamawit"
    },
    category: "academic",
    description: {
      en: "Interactive display of student neural net training modules and biology gene editing experiments.",
      am: "የተማሪዎች የኤአይ ፕሮጄክቶች፣ ሮቦት እና የሳይንስ ምርምር ውጤቶች እዚህ ለዕይታ ይቀርባሉ።",
      om: "Agarsiisa pirojektoota barattootara gargaaramanii qopha'an."
    }
  },
  {
    id: "e2",
    title: {
      en: "Ethiopian Heritage & Philharmonic Symphony Fusion",
      am: "የባህል ቅርስ ፌስቲቫል እና የፊልሃርሞኒክ ዝግጅት",
      om: "Festival Aadaa Itiyoophiyaa & Symphony Fusion"
    },
    date: "2026-08-01",
    time: "06:30 PM - 09:30 PM",
    location: {
      en: "Wisdom Grand Orchestral Auditorium",
      am: "በዊዝደም ታላቁ ኦርኬስትራ አዳራሽ",
      om: "Wiirtuu Orchestral Wisdom Keessatti"
    },
    category: "arts",
    description: {
      en: "An evening of classical orchestral scores side-by-side with beautiful traditional Kirar and Masinko compositions of diverse ethnic backgrounds.",
      am: "በተማሪዎች የተዘጋጁ አስደናቂ ባህላዊ የክራር እና የማሲንቆ ሙዚቃዎች እና ዘመናዊ ኦርኬስትራ ዝግጅቶች ትርኢት።",
      om: "Musiqaalee ammayyaa barattootaan barreeffameefi kilasikiis piano qopheessamee jira."
    }
  }
];

export const CLUBS: ClubInfo[] = [
  {
    id: "c1",
    name: {
      en: "STEM, Robotics & AI Lab",
      am: "የፈጠራ ሮቦቲክስ እና ኤአይ ማዕከል",
      om: "Wiirtuu Robotics & AI"
    },
    category: "tech",
    description: {
      en: "Building next-generation intelligent systems combining computer vision models, raspberry-pi logic, and automated routing mechanics.",
      am: "የኮምፒውተር እይታ ቴክኖሎጂን፣ ራስበሪ-ፓይ ኮዲንግን እና አውቶሜትድ መካኒክስን በማጣመር ዘመናዊ ሮቦቶችን የምንገነባበት ክበብ።",
      om: "Sirna robot ammayyaa kompiuteraan mul'atu, raspberry-pi, fi makaaniksii ofiin hojjetu barachuu."
    },
    schedule: "Tuesdays & Thursdays, 4:00 PM",
    imageUrl: "/src/assets/images/ethiopian_students_classroom_1781712311463.jpg"
  },
  {
    id: "c2",
    name: {
      en: "Wisdom Philharmonic & Kirar Ensemble",
      am: "የዊዝደም ፊልሃርሞኒክ እና የክራር ስብስብ",
      om: "Musiqa Orkesiraa & Kirar Ensemble"
    },
    category: "arts",
    description: {
      en: "Exposing young talents to complex violin scores, classical theory suites, and masterclass traditional Kirar/Masinko conducting.",
      am: "ለወጣት ጎበዝ ተማሪዎች ቫዮሊን፣ ክላሲካል የሙዚቃ ቲዎሪዎችን እና ባህላዊ የክራር ጨዋታዎችን በማስተማር ታላላቅ ኮንሰርቶችን ማዘጋጀት።",
      om: "Barattoonni violin, kilasikiis aartii, fi sirna orchestrating akka ogummaa qaban goona."
    },
    schedule: "Mondays & Fridays, 4:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "c3",
    name: {
      en: "Haile Gebrselassie Athletics & Football Club",
      am: "የሃይሌ ገብረሥላሴ አትሌቲክስ እና እግር ኳስ ክለብ",
      om: "Kilaaba Atleetiksii & Kubbaa Miilaa Haile G/Selassie"
    },
    category: "sports",
    description: {
      en: "High-performance distance training and field sports. Developing regional-level student-athletes to excel in soccer and track events.",
      am: "በማራቶን እና በረጅም ርቀት ሩጫዎች የሚሳተፉ ስፖርተኞችን ማሰልጠኛ ክለብ። ብሄራዊ ደረጃ ያላቸውን ተማሪዎች ማፍራት።",
      om: "Leenjii dakaa bishaan Olympic tti dorgommiif qophaa'an, gaggeessummaa saayinsii mijeessuu."
    },
    schedule: "Daily, 5:45 AM & 4:00 PM",
    imageUrl: "/src/assets/images/ethiopian_school_sports_athletics_1781712348924.jpg"
  }
];

export const GALLERIES = [
  { title: "Bole Central School Library", aspect: "Humanities", src: "/src/assets/images/ethiopian_students_classroom_1781712311463.jpg" },
  { title: "Selamawit Biology & Chemistry Labs", aspect: "Sciences", src: "/src/assets/images/ethiopian_school_science_lab_1781712327357.jpg" },
  { title: "Ethio-Space Astronomy Spot", aspect: "Astronomy", src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" },
  { title: "Central Meskel Garden Atrium", aspect: "Environment", src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400" },
  { title: "Aberra Sports Field & Track", aspect: "Athletics", src: "/src/assets/images/ethiopian_school_sports_athletics_1781712348924.jpg" },
  { title: "Wisdom STEM & Robotics Hub", aspect: "Technology", src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=400" }
];

export const ACCREDITATIONS = [
  { name: "Cambridge Assessment International Education Affiliate", cert: "UK Certificate CA-914-V" },
  { name: "New England Association of Schools and Colleges (NEASC)", cert: "Reg #82-1456A" },
  { name: "Ministry of Education - Elite High-Status Academy Accredited", cert: "Ethiopia RefMoE/89182" },
  { name: "STEM Excellence International Certification Association", cert: "STEM-Cert No. 004812" }
];

export const CORE_VALUES = [
  { name: { en: "Academic Rigor", am: "አካዳሚክ ጥንካሬ", om: "Academic Rigor" }, desc: { en: "Uncompromising standards of intellectual commitment and evaluation.", am: "እንከን የሌለው የአእምሮ ዝግጁነት እና የግምገማ መስፈርት።", om: "Uncompromising standards of intellectual commitment and evaluation." } },
  { name: { en: "Ethical Leadership", am: "የስነ-ምግባር መሪነት", om: "Geggeessummaa Haqa" }, desc: { en: "Character coupled with stewardship to uplift global societies.", am: "ባህሪን ከአገልጋይነት ጋር አጣምሮ ህብረተሰብን መለወጥ።", om: "Character coupled with stewardship to uplift global societies." } },
  { name: { en: "Technological Mastery", am: "የየቴክኖሎጂ የበላይነት", om: "Ogummaa Teeknoolojii" }, desc: { en: "Synthesizing AI, bio-sciences, and networks to innovate.", am: "የኤአይ፣ ባዮ-ሳይንስ እና ኔትወርኮችን በማዋሃድ ፈጠራ መፍጠር።", om: "Synthesizing AI, bio-sciences, and networks to innovate." } },
  { name: { en: "Cultural Harmony", am: "የባህል ስምምነት", om: "Ka'umsa Aadaa" }, desc: { en: "Deep local heritage coupled with infinite global outlook.", am: "ጥልቅ ሀገራዊ እሴትን ከአለም አቀፍ እይታ ጋር ማዋሃድ።", om: "Deep local heritage coupled with infinite global outlook." } }
];

export const FAQS = [
  {
    q: {
      en: "What is the standard student class capacity?",
      am: "የአንድ ክፍል መደበኛ የተማሪዎች ቁጥር ስንት ነው?",
      om: "Kappasitii barattoota kutaa tokkoo meeqa?"
    },
    a: {
      en: "We guarantee a strict cap of 16 students per room, maintained to ensure perfect mentorship and individualized STEM instruction.",
      am: "በአንድ ክፍል ውስጥ ከፍተኛው ተማሪ 16 ሲሆን፣ ይህ የተስተካከለው ለእያንዳንዱ ተማሪ የተሻለ ትኩረት ለመስጠት ነው።",
      om: "Dandeettii kutaa tokkoo 16 qofa ta'ee, barsiisaan barataa addatti akka gargaaruuf gargaara."
    }
  },
  {
    q: {
      en: "Which grading standard is deployed?",
      am: "የምንጠቀመው የተማሪዎች መገምገሚያ መስፈርት ምንድን ነው?",
      om: "Grading standard kamtu fayyadamama?"
    },
    a: {
      en: "We combine Cambridge letter grades (A* to G) at the IGCSE/A-Level alongside international percentage metrics with granular transcript indexes.",
      am: "የካምብሪጅ የደብዳቤ ውጤቶችን (A* እከታ G) ከሀገር አቀፍ መቶኛ ውጤቶች ጋር አጣምረን እንጠቀማለን።",
      om: "Qabxii herrega Cambridge (A* hanga G) fi standard ragaalee biyyaalessaa walitti idinee mijeessina."
    }
  },
  {
    q: {
      en: "Is there transportation and security service?",
      am: "የማመላለሻ መኪና እና የደህንነት አገልግሎት አለ?",
      om: "Tajaajilli geejjibaafi nageenyaa jiraa?"
    },
    a: {
      en: "Yes, our academy manages a premium satellite fleet with state-of-the-art telemetry tracking, alongside 24/7 security teams guarding all access portals.",
      am: "አዎ፣ ትምህርት ቤታችን በGPS እና ካሜራ የታገዙ ዘመናዊ አውቶቡሶች እንዲሁም 24 ሰአት የሚሰሩ ልዩ የጥበቃ ቡድኖች አሉት።",
      om: "Eeyyee, sirna geejjiba satellite telemetry tti cimsamee hordofamu, fi waardiyyoota 24/7 kellaa eegan qabna."
    }
  }
];

export const FAQS_ADMISSION = [
  {
    q: { en: "How does the screening competency exam work?", am: "የመግቢያ ብቃት ፈተናው እንዴት ነው የሚካሄደው?", om: "Madaallii seensaa hojiirra akkamitti oola?" },
    a: { en: "The competency evaluation is digital, testing core cognitive aptitude, mathematics reasoning, and creative writing. High-scoring student index ranges are scheduled automatically for physical review paneling.", am: "የብቃት ፈተናው በዲጂታል ፎርማት የሚወሰድ ሲሆን፥ ሂሳብ፣ አመክንዮ እና ሰብእናን ይገመግማል። ከፍተኛ ውጤት ያመጡ ተማሪዎች ለቀጣይ ቃለ-መጠይቅ ይጠራሉ።", om: "Madaalliin herreega, yaada sammuu, fi ogummaa barreeffama irratti toora interneetiin fudhatama. Qabxii gaariin kan milkaa'an gaaffi-deebii fi physical paneling iif waamamu." }
  },
  {
    q: { en: "What documentation should accompany admissions?", am: "ለምዝገባ ምን ሰነዶችን ማቅረብ ያስፈልጋል?", om: "Sanadoonni galmeef barbaachisan maal fa'i?" },
    a: { en: "Your candidate profile requires official transcripts from the immediate preceding 2 academic cycles, character letters of conduct signed by a principal, and passport/birth identification uploads.", am: "የተፈረሙ የባለፉት ሁለት ዓመታት ውጤቶች፣ የፀባይ መግለጫ ደብደቤ እና የልደት ሰርተፊኬት ወይም ፓስፖርት ማመልከቻው ላይ ማያያዝ ያስፈልጋል።", om: "Ragaaleen kaffaltii waggoota lama durii, xalayaa conduct dura-bu'aan mallatteeffame fi passport ykn kofoo dhalootaa upload gochuu qabdu." }
  }
];
