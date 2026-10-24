-- ==========================================================
-- منصة مناسبة (Munaasaba) - سكريبت إعداد قاعدة بيانات Supabase
-- ==========================================================
-- انسخ هذا الملف بالكامل والصقه في SQL Editor داخل لوحة تحكم Supabase
-- ثم اضغط على زر "RUN".

-- 1. تفعيل الامتدادات الضرورية
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. إنشاء جدول الدعوات (invitations)
CREATE TABLE IF NOT EXISTS public.invitations (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    template_id TEXT NOT NULL DEFAULT 'template-1',
    title TEXT NOT NULL,
    event_title TEXT NOT NULL DEFAULT 'حفل الزفاف المبارك',
    groom_name TEXT NOT NULL,
    bride_name TEXT NOT NULL,
    groom_parents TEXT DEFAULT '',
    bride_parents TEXT DEFAULT '',
    event_date TEXT NOT NULL,
    event_date_hijri TEXT DEFAULT '',
    day_of_week TEXT DEFAULT '',
    time_formatted TEXT DEFAULT '',
    venue_name TEXT NOT NULL,
    venue_hall TEXT DEFAULT '',
    venue_city TEXT NOT NULL,
    venue_address TEXT DEFAULT '',
    google_maps_url TEXT DEFAULT '',
    header_verse TEXT DEFAULT '',
    verse_source TEXT DEFAULT '',
    welcome_message TEXT DEFAULT '',
    rsvp_count INTEGER DEFAULT 0,
    rsvp_device_list JSONB DEFAULT '[]'::jsonb,
    is_public BOOLEAN DEFAULT true,
    toggles JSONB DEFAULT '{}'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    typography JSONB DEFAULT '{}'::jsonb,
    theme_accent_color TEXT DEFAULT '#d4af37',
    cover_music_track TEXT DEFAULT '',
    custom_video_url TEXT DEFAULT '',
    custom_image_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- الترقية التلقائية للمشاريع الحالية (إضافة الأعمدة إذا لم تكن موجودة)
ALTER TABLE public.invitations ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- 3. إنشاء جدول سجلات الحضور (rsvp_logs) لمنع التكرار وحفظ أجهزة وضيوف الدعوة
CREATE TABLE IF NOT EXISTS public.rsvp_logs (
    id BIGSERIAL PRIMARY KEY,
    invitation_id TEXT NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
    invitation_slug TEXT NOT NULL,
    device_fingerprint TEXT NOT NULL,
    guest_count INTEGER DEFAULT 1,
    guest_name TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(invitation_id, device_fingerprint)
);

ALTER TABLE public.rsvp_logs ADD COLUMN IF NOT EXISTS guest_count INTEGER DEFAULT 1;

-- 4. إنشاء الفهارس (Indexes) لتسريع الاستعلامات
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_rsvp_logs_inv_device ON public.rsvp_logs(invitation_id, device_fingerprint);

-- 5. إعداد حماية مستوى الصفوف (Row Level Security - RLS)
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_logs ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بقراءة الدعوات (عام للزوار)
DROP POLICY IF EXISTS "Allow public read invitations" ON public.invitations;
CREATE POLICY "Allow public read invitations" 
ON public.invitations FOR SELECT 
USING (true);

-- السماح بإضافة وتعديل وحذف الدعوات (للوحة التحكم)
DROP POLICY IF EXISTS "Allow all for invitations" ON public.invitations;
CREATE POLICY "Allow all for invitations" 
ON public.invitations FOR ALL 
USING (true)
WITH CHECK (true);

-- السماح للجميع بقراءة وإضافة تأكيدات الحضور
DROP POLICY IF EXISTS "Allow public read and insert rsvp_logs" ON public.rsvp_logs;
CREATE POLICY "Allow public read and insert rsvp_logs" 
ON public.rsvp_logs FOR ALL 
USING (true)
WITH CHECK (true);

-- 6. إضافة بيانات النماذج الخمسة الافتراضية (Seed Data)
INSERT INTO public.invitations (
    id, slug, template_id, title, event_title, groom_name, bride_name,
    groom_parents, bride_parents, event_date, event_date_hijri, day_of_week,
    time_formatted, venue_name, venue_hall, venue_city, venue_address,
    google_maps_url, header_verse, verse_source, welcome_message, rsvp_count,
    theme_accent_color, toggles, typography, timeline
) VALUES
(
    'inv-1',
    'demo-bab',
    'template-1',
    'دعوة زفاف أحمد وريم',
    'حفل الزفاف المبارك',
    'أحمد بن خالد',
    'ريم بنت منصور',
    'أبناء الشيخ خالد بن إبراهيم آل سعود رحمه الله',
    'وكريمة معالي الأستاذ منصور بن عبدالعزيز التميمي',
    '2026-11-20T20:00:00',
    '١١ جمادى الأولى ١٤٤٨ هـ',
    'الجمعة',
    'الساعة ٨:٠٠ مساءً',
    'قصر الثريا للاحتفالات والمؤتمرات',
    'القاعة الملكية الكبرى',
    'الرياض',
    'طريق الملك فهد، حي الصحافة، الرياض',
    'https://maps.google.com/?q=24.774265,46.638515',
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    'سورة الروم - آية ٢١',
    'يتشرفون بدعوتكم الكريمة لمشاركتهم فرحتهم بمناسبة زواج نجلهم الشاب المبارك، وتناول طعام العشاء، وبحضوركم تكتمل بهجتنا ومسرتنا.',
    84,
    '#d4af37',
    '{"showCountdown": true, "showCalendar": true, "showLocation": true, "showRsvp": true, "showChildrenAdvisory": true, "childrenAdvisoryText": "جنة الأطفال منازلهم.. نعتذر عن استقبال أحبائنا الصغار لتكون ليلتنا هادئة ومميزة بحضوركم الراقي.", "showDressCode": true, "dressCodeText": "الزي الرسمي السعودي (ثوب وبشت للرجال / زي السهرة الأنيق للسيدات)", "showTimeline": true, "showMusic": true, "showVerse": true, "showParents": true, "showShare": true, "musicUrl": "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"}'::jsonb,
    '{"namesFontFamily": "ruqaa", "verseFontFamily": "amiri", "parentsFontFamily": "tajawal", "namesSize": "xlarge", "verseSize": "medium", "parentsSize": "medium", "namesColor": "#fde047", "verseColor": "#fef3c7", "parentsColor": "#ffffff", "welcomeColor": "#fef3c7", "timelineColor": "#fef3c7"}'::jsonb,
    '[{"id": "t1", "time": "٠٨:٠٠ م", "label": "استقبال الضيوف الكرام والترحيب", "icon": "coffee"}, {"id": "t2", "time": "٠٩:٣٠ م", "label": "الزفة المباركة ومراسم الفرح", "icon": "ring"}, {"id": "t3", "time": "١٠:٣٠ م", "label": "تقطيع قالب الفرح والتهاني", "icon": "cake"}, {"id": "t4", "time": "١١:٠٠ م", "label": "تناول طعام العشاء الفاخر", "icon": "dinner"}]'::jsonb
),
(
    'inv-2',
    'modern-minimalist',
    'template-2',
    'عقد قران زياد وسارة',
    'عقد قران وزفاف مبارك',
    'زياد الحربي',
    'سارة الشريف',
    'السيد فيصل بن سعود الحربي وحرمه',
    'والشريف عبدالله بن هاشم وحرمه',
    '2026-12-05T19:30:00',
    '٢٦ جمادى الآخرة ١٤٤٨ هـ',
    'السبت',
    'الساعة ٧:٣٠ مساءً',
    'فندق فورسيزونز الرياض',
    'قاعة المملكة',
    'الرياض',
    'برج المملكة، طريق العروبة، الرياض',
    'https://maps.google.com/?q=24.711666,46.674444',
    'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    'حديث نبوي شريف',
    'يسعدنا ويشرفنا حضوركم ومشاركتنا أبهى لحظات العمر في ليلة عقد قران وزفاف نجلنا، أهلاً وسهلاً بكم في داركم.',
    42,
    '#c5a059',
    '{"showCountdown": true, "showCalendar": true, "showLocation": true, "showRsvp": true, "showChildrenAdvisory": true, "childrenAdvisoryText": "نرجو منكم المعذرة بعدم اصطحاب الأطفال، شاكرين لكم تفهمكم وحسن تعاونكم.", "showDressCode": true, "dressCodeText": "Black Tie / أناقة كلاسيكية معاصرة", "showTimeline": true, "showMusic": true, "showVerse": true, "showParents": true, "showShare": true, "musicUrl": "https://assets.mixkit.co/music/preview/mixkit-gentle-piano-love-202.mp3"}'::jsonb,
    '{"namesFontFamily": "cairo", "verseFontFamily": "amiri", "parentsFontFamily": "tajawal", "namesSize": "large", "verseSize": "medium", "parentsSize": "medium", "namesColor": "#f5f5f4", "verseColor": "#e7e5e4", "parentsColor": "#fafaf9", "welcomeColor": "#e7e5e4", "timelineColor": "#f5f5f4"}'::jsonb,
    '[{"id": "t1", "time": "٠٧:٣٠ م", "label": "بدء استقبال المهنئين والضيوف", "icon": "coffee"}, {"id": "t2", "time": "٠٩:٠٠ م", "label": "مراسم عقد القران والزفة", "icon": "ring"}, {"id": "t3", "time": "١٠:٣٠ م", "label": "مأدبة العشاء الاحتفائية", "icon": "dinner"}]'::jsonb
),
(
    'inv-3',
    'royal-floral',
    'template-3',
    'حفل زفاف طارق ولمى',
    'حفل الزفاف والبهجة',
    'طارق بن ناصر',
    'لمى بنت فهد',
    'الشيخ ناصر بن محمد العلي وحرمه',
    'والمهندس فهد بن سليمان السعدون وحرمه',
    '2026-11-28T20:30:00',
    '١٩ جمادى الأولى ١٤٤٨ هـ',
    'السبت',
    'الساعة ٨:٣٠ مساءً',
    'منتجع وفندق الريتز كارلتون',
    'قاعة الأوركيد الزهرية',
    'جدة',
    'طريق الكورنيش، حي الحمراء، جدة',
    'https://maps.google.com/?q=21.5169,39.1558',
    'في ليلةٍ من ليالي العمرِ زاهيةٍ ... تزهو الورودُ وتزدانُ الأماني\nبحضوركم تكتملُ فرحتُنا ... ويسطعُ البدرُ في أبهى معانيه',
    'نفحات شعرية',
    'تحت قطرات الندى وعبق الزهور الفواحة، ندعوكم لمشاركتنا فرحة العمر وأطيب الأوقات بصحبتكم الراقية.',
    67,
    '#e89da2',
    '{"showCountdown": true, "showCalendar": true, "showLocation": true, "showRsvp": true, "showChildrenAdvisory": true, "childrenAdvisoryText": "أطفالكم في عيوننا وفي بيوتكم أغلى، نرجو عدم اصطحابهم لمشاركتنا الأمسية الهادئة.", "showDressCode": true, "dressCodeText": "فساتين السهرة الناعمة وألوان الباستيل الأنيقة", "showTimeline": true, "showMusic": true, "showVerse": true, "showParents": true, "showShare": true, "musicUrl": "https://assets.mixkit.co/music/preview/mixkit-wedding-waltz-238.mp3"}'::jsonb,
    '{"namesFontFamily": "ruqaa", "verseFontFamily": "amiri", "parentsFontFamily": "tajawal", "namesSize": "xlarge", "verseSize": "medium", "parentsSize": "medium", "namesColor": "#ffe4e6", "verseColor": "#fce7f3", "parentsColor": "#ffffff", "welcomeColor": "#fdf2f8", "timelineColor": "#fbcfe8"}'::jsonb,
    '[{"id": "t1", "time": "٠٨:٣٠ م", "label": "استقبال المدعوين بالقهوة والبخور", "icon": "coffee"}, {"id": "t2", "time": "١٠:٠٠ م", "label": "إطلالة العروسين والزفة الوردية", "icon": "ring"}, {"id": "t3", "time": "١١:١٥ م", "label": "بوفيه العشاء الفاخر", "icon": "dinner"}]'::jsonb
),
(
    'inv-4',
    'midnight-stars',
    'template-4',
    'ليلة العمر - فيصل ونورة',
    'أمسية الزفاف الملكية',
    'فيصل بن بدر',
    'نورة بنت سلطان',
    'سعادة الأستاذ بدر بن حمدان القحطاني',
    'وكريمة الدكتور سلطان بن عبدالعزيز الغامدي',
    '2026-12-18T20:00:00',
    '٩ رجب ١٤٤٨ هـ',
    'الجمعة',
    'الساعة ٨:٠٠ مساءً',
    'فندق الفيصلية - ماندرين أورينتال',
    'قاعة الأمير سلطان الكبرى',
    'الرياض',
    'طريق الملك فهد، العليا، الرياض',
    'https://maps.google.com/?q=24.6903,46.6853',
    'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ',
    'سورة الأنفال - آية ٦٣',
    'تحت ضياء النجوم وبريق الذهب، نسعد بحضوركم وتشريفكم لنا في ليلة لا تُنسى من ليالي السعد والفرح.',
    112,
    '#e0c068',
    '{"showCountdown": true, "showCalendar": true, "showLocation": true, "showRsvp": true, "showChildrenAdvisory": true, "childrenAdvisoryText": "شاكرين لكم مشاعركم الودية، ونلتمس منكم العذر في عدم اصطحاب الأطفال.", "showDressCode": true, "dressCodeText": "الملابس الرسمية الفاخرة باللون الأسود أو الذهبي أو الكحلي", "showTimeline": true, "showMusic": true, "showVerse": true, "showParents": true, "showShare": true, "musicUrl": "https://assets.mixkit.co/music/preview/mixkit-celestial-stars-112.mp3"}'::jsonb,
    '{"namesFontFamily": "ruqaa", "verseFontFamily": "amiri", "parentsFontFamily": "cairo", "namesSize": "xlarge", "verseSize": "medium", "parentsSize": "medium", "namesColor": "#fde047", "verseColor": "#fef9c3", "parentsColor": "#ffffff", "welcomeColor": "#fef08a", "timelineColor": "#fef08a"}'::jsonb,
    '[{"id": "t1", "time": "٠٨:٠٠ م", "label": "الاستقبال والترحيب في الردهة الذهبية", "icon": "coffee"}, {"id": "t2", "time": "٠٩:٣٠ م", "label": "مراسم الزفة الملكية", "icon": "ring"}, {"id": "t3", "time": "١٠:٣٠ م", "label": "تقطيع كعكة الزفاف والتصوير", "icon": "cake"}, {"id": "t4", "time": "١١:١٥ م", "label": "مأدبة العشاء الملكي", "icon": "dinner"}]'::jsonb
),
(
    'inv-5',
    'heritage-andalus',
    'template-5',
    'عرس الأصالة - ماجد وهيا',
    'حفل الزواج التراثي الأصيل',
    'ماجد بن تركي',
    'هيا بنت عبدالله',
    'الشيخ تركي بن محمد الدوسري وإخوانه',
    'والشيخ عبدالله بن راشد الخالدي وإخوانه',
    '2026-12-25T19:00:00',
    '١٦ رجب ١٤٤٨ هـ',
    'الجمعة',
    'الساعة ٧:٠٠ مساءً',
    'قصر الدرعية التراثي للاحتفالات',
    'قاعة الطريف التراثية',
    'الدرعية التاريخية',
    'حي البجيري، الدرعية، منطقة الرياض',
    'https://maps.google.com/?q=24.7335,46.5755',
    'باسمِ الذي قد جمعَ الشملَ فينا ... نهدي إليكم فيضَ عاطرِ تحايانا\nأهلاً بكم والدارُ يبهجُها اللقاء ... يا مرحباً بقلوبكم وضياؤكم عنوانا',
    'قصيدة ترحيبية أصيلة',
    'على خطى الأصالة وعراقة التراث، يطيب لنا دعوتكم لتشاركونا فرحة الأهل والخلان في ليلة تعبق برائحة الهيل والعود.',
    95,
    '#c27848',
    '{"showCountdown": true, "showCalendar": true, "showLocation": true, "showRsvp": true, "showChildrenAdvisory": true, "childrenAdvisoryText": "جنة الأطفال منازلهم.. مع جزيل الشكر والتقدير لتفهمكم وحضوركم الكريم.", "showDressCode": true, "dressCodeText": "الزي التراثي السعودي الأصيل / ثوب وبشت وصاية", "showTimeline": true, "showMusic": true, "showVerse": true, "showParents": true, "showShare": true, "musicUrl": "https://assets.mixkit.co/music/preview/mixkit-oriental-desert-oud-529.mp3"}'::jsonb,
    '{"namesFontFamily": "amiri", "verseFontFamily": "amiri", "parentsFontFamily": "tajawal", "namesSize": "xlarge", "verseSize": "medium", "parentsSize": "medium", "namesColor": "#fed7aa", "verseColor": "#ffedd5", "parentsColor": "#ffffff", "welcomeColor": "#fed7aa", "timelineColor": "#fed7aa"}'::jsonb,
    '[{"id": "t1", "time": "٠٧:٠٠ م", "label": "مجلس القهوة السعودية والعود والبخور", "icon": "coffee"}, {"id": "t2", "time": "٠٨:٣٠ م", "label": "العرضة التراثية والزفة الأصيلة", "icon": "music"}, {"id": "t3", "time": "١٠:٠٠ م", "label": "العشاء التراثي على موائد الكرم", "icon": "dinner"}]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
