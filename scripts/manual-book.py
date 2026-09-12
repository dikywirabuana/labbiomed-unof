#!/usr/bin/env python3
"""Buku panduan presentasi Laboratorium BIOMED — PT. Biomed Husada."""

from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    FrameBreak,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

INK = HexColor("#1a2832")
STEEL = HexColor("#3d5a73")
RED = HexColor("#c81e24")
GOLD = HexColor("#c4a35a")
PAPER = HexColor("#f3efe6")
SURFACE = HexColor("#fffdf8")
MUTED = HexColor("#5d6d78")
LINE = HexColor("#d4dce3")

LOGO = "/workspace/public/logo-mark.png"
OUT = "/workspace/public/manual-biomed.pdf"

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSerif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSerifBold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("CoverKicker", fontName="DejaVuBold", fontSize=9, textColor=GOLD, alignment=TA_CENTER, spaceAfter=10))
    s.add(ParagraphStyle("CoverTitle", fontName="DejaVuSerifBold", fontSize=28, leading=34, textColor=white, alignment=TA_CENTER, spaceAfter=8))
    s.add(ParagraphStyle("CoverSub", fontName="DejaVu", fontSize=12, leading=17, textColor=HexColor("#d5dee4"), alignment=TA_CENTER))
    s.add(ParagraphStyle("H1", fontName="DejaVuSerifBold", fontSize=18, leading=24, textColor=INK, spaceBefore=4, spaceAfter=10))
    s.add(ParagraphStyle("H2", fontName="DejaVuBold", fontSize=12, leading=16, textColor=RED, spaceBefore=12, spaceAfter=6))
    s.add(ParagraphStyle("Body", fontName="DejaVu", fontSize=10, leading=15, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=8))
    s.add(ParagraphStyle("Item", fontName="DejaVu", fontSize=10, leading=14.5, textColor=INK, leftIndent=12, spaceAfter=3))
    s.add(ParagraphStyle("Say", fontName="DejaVu", fontSize=9.5, leading=14, textColor=STEEL, leftIndent=8, rightIndent=8))
    s.add(ParagraphStyle("SayLabel", fontName="DejaVuBold", fontSize=8, textColor=RED, spaceAfter=3))
    s.add(ParagraphStyle("Caption", fontName="DejaVu", fontSize=8.5, leading=12, textColor=MUTED))
    s.add(ParagraphStyle("TH", fontName="DejaVuBold", fontSize=8.5, leading=12, textColor=white))
    s.add(ParagraphStyle("TD", fontName="DejaVu", fontSize=8.5, leading=12, textColor=INK))
    s.add(ParagraphStyle("TDbold", fontName="DejaVuBold", fontSize=8.5, leading=12, textColor=INK))
    s.add(ParagraphStyle("Footer", fontName="DejaVu", fontSize=8, textColor=MUTED))
    s.add(ParagraphStyle("StepN", fontName="DejaVuBold", fontSize=14, textColor=white, alignment=TA_CENTER))
    s.add(ParagraphStyle("CenterMuted", fontName="DejaVu", fontSize=10, leading=14, textColor=MUTED, alignment=TA_CENTER))
    return s


S = styles()


def say_box(text):
    inner = [
        Paragraph("YANG DIUCAPKAN", S["SayLabel"]),
        Paragraph(text, S["Say"]),
    ]
    t = Table([[inner]], colWidths=[170 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HexColor("#eef2f4")),
                ("BOX", (0, 0), (-1, -1), 0.6, GOLD),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return t


def photo(path, w_mm=170, caption=""):
    from os.path import exists, getsize

    if not exists(path) or getsize(path) < 2000:
        return []
    img = Image(path, width=w_mm * mm, height=w_mm * mm * 0.52, kind="proportional")
    img.hAlign = "CENTER"
    bits = [Spacer(1, 3 * mm), img]
    if caption:
        bits.append(Paragraph(caption, S["Caption"]))
    bits.append(Spacer(1, 4 * mm))
    return bits


def bullets(items):
    return [Paragraph(f"•  {x}", S["Item"]) for x in items]


def kv_table(rows, widths=None):
    data = [[Paragraph(a, S["TDbold"]), Paragraph(b, S["TD"])] for a, b in rows]
    t = Table(data, colWidths=widths or [48 * mm, 122 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), HexColor("#e8eef2")),
                ("BACKGROUND", (1, 0), (1, -1), SURFACE),
                ("GRID", (0, 0), (-1, -1), 0.3, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def head_table(headers, rows, col_w):
    data = [[Paragraph(h, S["TH"]) for h in headers]]
    for r in rows:
        data.append([Paragraph(c, S["TD"]) for c in r])
    t = Table(data, colWidths=col_w, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), STEEL),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), SURFACE if i % 2 else HexColor("#eef2f4")))
    t.setStyle(TableStyle(style))
    return t


def draw_cover(c: Canvas, doc):
    w, h = A4
    c.setFillColor(STEEL)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(RED)
    c.rect(0, 0, 14 * mm, h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(14 * mm, 0, 2.2 * mm, h, fill=1, stroke=0)
    try:
        c.drawImage(LOGO, w / 2 - 18 * mm, h - 72 * mm, 36 * mm, 36 * mm, mask="auto", preserveAspectRatio=True, anchor="c")
    except Exception:
        pass
    c.setFillColor(GOLD)
    c.setFont("DejaVuBold", 9)
    c.drawCentredString(w / 2, 38 * mm, "RAHASIA INTERNAL  ·  BUKAN UNTUK PASIEN")
    c.setFillColor(HexColor("#9aafbb"))
    c.setFont("DejaVu", 8)
    c.drawCentredString(w / 2, 22 * mm, "PT. Biomed Husada  ·  Laboratorium BIOMED  ·  Banten sejak 1991")


def draw_inner(c: Canvas, doc):
    w, h = A4
    c.setFillColor(PAPER)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(STEEL)
    c.rect(0, h - 16 * mm, w, 16 * mm, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, h - 16.8 * mm, w, 0.8 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("DejaVuBold", 8)
    c.drawString(18 * mm, h - 10 * mm, "Laboratorium BIOMED")
    c.setFont("DejaVu", 8)
    c.drawRightString(w - 18 * mm, h - 10 * mm, "Buku panduan presentasi")
    c.setFillColor(STEEL)
    c.rect(0, 0, w, 12 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor("#d5dee4"))
    c.setFont("DejaVu", 8)
    c.drawString(18 * mm, 5 * mm, "PT. Biomed Husada  ·  PIN FO: bio1234")
    c.drawRightString(w - 18 * mm, 5 * mm, f"{doc.page}")


def build():
    doc = BaseDocTemplate(
        OUT,
        pagesize=A4,
        title="Buku Panduan Presentasi — Laboratorium BIOMED",
        author="PT. Biomed Husada",
        subject="Manual operasional PWA dan front office BIOMED",
    )
    cover_frame = Frame(22 * mm, 48 * mm, 166 * mm, 170 * mm, id="cover")
    inner_frame = Frame(18 * mm, 18 * mm, 174 * mm, 253 * mm, id="inner")
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover),
            PageTemplate(id="inner", frames=[inner_frame], onPage=draw_inner),
        ]
    )

    story = []

    # COVER
    story += [
        Spacer(1, 52 * mm),
        Paragraph("BUKU PANDUAN PRESENTASI", S["CoverKicker"]),
        Paragraph("Sistem PWA & Front Office<br/>Laboratorium BIOMED", S["CoverTitle"]),
        Spacer(1, 8 * mm),
        Paragraph(
            "PT. Biomed Husada<br/>Dr. T.K. Darmawan, Sp.PK — Penanggung jawab<br/>Serang · Cilegon · Cikupa · Pandeglang · Rangkasbitung",
            S["CoverSub"],
        ),
        Spacer(1, 18 * mm),
        Paragraph("Edisi operator  ·  September 2026  ·  Untuk demo internal", S["CoverSub"]),
        NextPageTemplate("inner"),
        PageBreak(),
    ]

    story += [
        Paragraph("Daftar isi", S["H1"]),
        *bullets(
            [
                "1. Cara memakai buku ini — naskah 12 menit dan persiapan",
                "2. Peta sistem — situs publik, PWA, enam meja FO",
                "3. Situs publik & PWA — apa yang ditunjukkan ke tamu",
                "4. Membuka front office — segitiga kuning dan sandi",
                "5. Kasir — pasien baru/lama, DP, hutang, struk, stiker EDTA",
                "6. Hasil laboratorium — nilai, rujukan, flag H/L",
                "7. USG dan radiologi — antrian hari ini dan pengingat jam",
                "8. Stok per cabang — kontrol, kebutuhan, distribusi Serang",
                "9. Keuangan — uang masuk, piutang, pengeluaran, laba",
                "10. Barcode hasil & keaslian — kunci sampai lunas",
                "11. Lembar hapalan presenter",
                "12. Penutup",
            ]
        ),
        PageBreak(),
    ]

    # 1. Cara pakai
    story += [
        Paragraph("1. Cara memakai buku ini", S["H1"]),
        Paragraph(
            "Buku ini disusun agar presentasi berjalan urut: dari situs yang dilihat pengunjung, masuk ke aplikasi kerja (segitiga kuning), lalu mengikuti satu pasien dari daftar sampai hasil keluar. Jangan meloncat ke stok atau keuangan di menit pertama — pemilik lebih mudah percaya jika alur pasien utuh dulu.",
            S["Body"],
        ),
        say_box(
            "“Ini bukan hanya brosur online. Pengunjung pasang di HP seperti aplikasi. Di belakang, loket, lab, USG, radiologi, gudang, dan keuangan memakai satu sistem yang sama.”"
        ),
        Spacer(1, 4 * mm),
        Paragraph("Naskah 12 menit", S["H2"]),
    ]
    story.append(
        head_table(
            ["Menit", "Bagian", "Yang ditunjukkan"],
            [
                ["0–2", "Beranda + PWA", "Logo, cabang, ISO, tombol pasang di HP"],
                ["2–4", "Harga & reservasi", "Harga beda per cabang, form reservasi WA"],
                ["4–6", "Kasir", "Segitiga → PIN → pasien baru, kurang bayar"],
                ["6–8", "Lab / USG / Ro", "Isi hasil, cetak, pengingat antrian"],
                ["8–10", "Stok + uang", "Menipis per cabang, kirim Serang, hutang"],
                ["10–12", "Barcode", "Pindai struk: terkunci jika belum lunas"],
            ],
            [28 * mm, 42 * mm, 104 * mm],
        )
    )
    story += [
        Paragraph("Persiapan 5 menit sebelum hadir", S["H2"]),
        *bullets(
            [
                "Buka situs di laptop (layar besar) dan di HP (bukti PWA).",
                "Hapus keraguan PIN: ketik bio1234 sekali, biar tidak gagap.",
                "Siapkan 1 pasien demo: nama lengkap, HP, tanggal lahir, KTP 16 digit.",
                "Pilih cabang Serang. Masukkan 1 tes darah + 1 USG + 1 rontgen.",
                "Bayar sebagian (DP) supaya hutang dan kunci hasil bisa didemo.",
            ]
        ),
        PageBreak(),
    ]

    # 2. Peta sistem
    story += [
        Paragraph("2. Peta sistem", S["H1"]),
        Paragraph(
            "Ada dua wajah. Depan adalah situs publik (PWA). Belakang adalah front office yang hanya terbuka dari tombol segitiga kuning di bawah layar, dilindungi kata sandi.",
            S["Body"],
        ),
        kv_table(
            [
                ("Situs publik", "Beranda, legalitas, layanan, checkup, fasilitas, galeri, berita, artikel, harga per cabang, cabang, reservasi WhatsApp."),
                ("PWA", "Bisa dipasang di HP, tablet, dan desktop. Reservasi dan cek hasil dari ikon di layar utama."),
                ("Front office", "Kasir, hasil lab, USG, radiologi, stok barang, keuangan."),
                ("Kunci hasil", "Tautan barcode struk hanya menampilkan angka jika tagihan lunas dan lab/USG/Ro sudah diisi."),
            ]
        ),
        Paragraph("Enam meja kerja", S["H2"]),
        head_table(
            ["Meja", "Pemakai", "Tugas utama"],
            [
                ["Kasir", "Front office", "Pasien baru/lama, keranjang tes, bayar, hutang, struk, stiker EDTA"],
                ["Hasil lab", "ATLM", "Nilai, satuan, rujukan, flag H/L, cetak lembar"],
                ["USG", "Sonografer / dokter", "Antrian hari ini, pengingat jam, temuan + kesan"],
                ["Radiologi", "Penata rontgen", "Antrian foto, pengingat, temuan + kesan"],
                ["Stok", "Gudang / pemilik", "Kontrol habis-menipis, kebutuhan cabang, distribusi dari Serang"],
                ["Keuangan", "Pemilik", "Uang masuk kasir+pelunasan, piutang, pengeluaran, laba rugi"],
            ],
            [32 * mm, 42 * mm, 100 * mm],
        ),
        Paragraph("Cabang", S["H2"]),
        Paragraph(
            "Serang adalah gudang pusat. Cilegon, Cikupa, Pandeglang, dan Rangkasbitung menerima distribusi barang dari Serang. Harga tes mengikuti daftar masing-masing cabang (PDF pricelist Agustus 2026).",
            S["Body"],
        ),
        PageBreak(),
    ]

    # 3. Situs publik
    story += [
        Paragraph("3. Situs publik & PWA", S["H1"]),
        Paragraph(
            "Mulai presentasi di beranda. Tekankan identitas: PT. Biomed Husada, lab klinik Banten sejak 1991, PJ Dr. T.K. Darmawan, Sp.PK. Logo mikroskop merah di nuansa biru-abu. Mode malam tersedia, tidak pekat.",
            S["Body"],
        ),
        say_box(
            "“Pengunjung tidak perlu aplikasi Play Store. Buka situs, pasang ke layar HP, lalu reservasi seperti aplikasi klinik.”"
        ),
        *photo("/workspace/screenshots/harga-cabang.png", 160, "Daftar harga mengikuti cabang yang dipilih — jangan pakai satu daftar untuk semua kota."),
        Spacer(1, 3 * mm),
        Paragraph("Menu yang wajib disinggung", S["H2"]),
        *bullets(
            [
                "Legalitas — unggahan asli: NIB, KALK, ISO, akreditasi, izin cabang. Jangan klaim logo yang tidak ada di web resmi.",
                "Harga — pilih chip cabang. Harga Serang dan Cilegon tidak sama.",
                "Checkup / layanan — MCU, lab, USG, rontgen, EKG.",
                "Artikel & berita — naskah dari web resmi, bukan isi acak.",
                "Reservasi — form ke WhatsApp pusat 0811 1234 988.",
            ]
        ),
        Paragraph("Aksi di layar", S["H2"]),
        *bullets(
            [
                "Geser hero, tunjukkan lencana ISO di bawah foto dokter — bukan stempel karangan.",
                "Buka /harga, ganti cabang dua kali agar beda harga terlihat.",
                "Di HP, tunjukkan prompt pasang PWA (Add to Home Screen).",
                "Jangan klik segitiga dulu. Biarkan audiens melihat sisi pasien.",
            ]
        ),
        PageBreak(),
    ]

    # 4. FO
    story += [
        Paragraph("4. Membuka front office", S["H1"]),
        Paragraph(
            "Tombol segitiga kuning menempel di tengah bawah setiap halaman. Itu pintu staf, bukan menu pasien. Setelah diklik, layar minta kata sandi.",
            S["Body"],
        ),
        kv_table(
            [
                ("Letak", "Paling bawah, tengah layar, di atas prompt pasang PWA."),
                ("Kata sandi", "bio1234  —  wajib diucapkan “hanya untuk demo internal, diganti di produksi”."),
                ("Jika tidak terbuka", "Pastikan menekan area segitiga (bukan sudut halaman). Refresh sekali."),
                ("Keluar", "Tombol Menu kembali ke enam kartu; ikon silang menutup FO."),
            ]
        ),
        say_box(
            "“Segitiga ini sengaja kecil. Pasien tidak perlu melihat kasir. Staf yang tahu sandi yang masuk.”"
        ),
        *photo("/workspace/screenshots/fo-open.png", 160, "Setelah sandi benar: enam meja kerja. Urutan demo Kasir → Lab → USG → Radiologi → Stok → Keuangan."),
        Spacer(1, 3 * mm),
        Paragraph("Urutan kartu saat demo", S["H2"]),
        Paragraph("Kasir → Hasil lab → USG → Radiologi → Stok → Keuangan. Jangan buka keuangan lebih dulu; angka lebih bermakna setelah ada transaksi.", S["Body"]),
        PageBreak(),
    ]

    # 5. Kasir
    story += [
        Paragraph("5. Kasir: daftar, bayar, hutang", S["H1"]),
        Paragraph(
            "Pilih cabang di header. Harga keranjang mengikuti cabang itu. Ada dua mode: pasien baru dan pasien lama.",
            S["Body"],
        ),
        Paragraph("Pasien baru — wajib", S["H2"]),
        *bullets(["Nama lengkap", "Nomor HP", "Jenis kelamin", "Tanggal lahir", "Nomor KTP"]),
        Paragraph("Pasien lama", S["H2"]),
        Paragraph(
            "Cari KTP, HP, atau nama. Setelah dipilih, riwayat kunjungan dan hasil terdahulu muncul. Di sini juga pelunasan hutang: buka nomor lab yang masih sisa, isi jumlah, Terima pelunasan.",
            S["Body"],
        ),
        Paragraph("Bayar", S["H2"]),
        kv_table(
            [
                ("Metode", "Tunai, QRIS, Debit, Asuransi, Perusahaan."),
                ("Dibayar sekarang", "Isi nominal. Jika kurang dari total, sistem mencatat hutang."),
                ("Tombol", "Bayar lunas  /  Bayar DP · hutang  /  Simpan hutang."),
                ("Akibat hutang", "Hasil lab/USG/Ro tetap bisa diisi staf, tetapi tautan pasien terkunci."),
            ]
        ),
        say_box(
            "“Kemarin pasien bayar sebagian. Hari ini ambil hasil, lunasi dulu. Baru barcode di struk bisa dibuka.”"
        ),
        Spacer(1, 3 * mm),
        Paragraph("Dua cetakan kasir", S["H2"]),
        *bullets(
            [
                "Tanda pembayaran — struk + QR/barcode tautan hasil. Jika hutang, tertulis sisa dan hasil terkunci.",
                "Stiker EDTA — barcode, nama pasien, umur, nomor lab. Tempel ke tabung.",
            ]
        ),
        Paragraph(
            "Skrip demo: daftar pasien baru → keranjang Darah Lengkap + USG Kandungan + Rontgen Thorax PA → bayar setengah → cetak struk dan stiker.",
            S["Body"],
        ),
        *photo("/workspace/screenshots/kasir2.png", 160, "Kasir: keranjang kiri, identitas kanan, dibayar sekarang bisa kurang dari total (hutang)."),
        PageBreak(),
    ]

    # 6. Lab
    story += [
        Paragraph("6. Meja hasil laboratorium", S["H1"]),
        Paragraph(
            "Hanya tes darah/urine/imun yang diisi di sini. USG dan rontgen disaring ke meja pencitraan. Cari nomor lab, isi nilai. Satuan dan nilai rujukan terisi otomatis; flag H (tinggi) atau L (rendah) muncul sendiri.",
            S["Body"],
        ),
        say_box("“Ini lembar hasil seperti di lab sungguhan: parameter, angka, satuan, rujukan, keterangan H atau L.”"),
        Spacer(1, 3 * mm),
        Paragraph("Cetak lembar", S["H2"]),
        Paragraph(
            "Ada barcode validasi keaslian dan kode sah. Pindai membuka /validasi/{kode}. Jika belum lunas: “Belum lunas”. Jika lunas dan isi cocok: “Asli”.",
            S["Body"],
        ),
        PageBreak(),
        Paragraph("7. Meja USG dan radiologi", S["H1"]),
        Paragraph(
            "Dua kartu terpisah karena operator berbeda. Isi sama polanya: pasien hari ini di kiri, form temuan + kesan di kanan, pita pengingat di atas.",
            S["Body"],
        ),
        kv_table(
            [
                ("Pasien hari ini", "Hanya yang bayar item USG atau rontgen pada tanggal ini."),
                ("Jadwal pengingat", "Antrian jam otomatis (USG ±20 menit, rontgen ±10 menit). Pita emas di atas: jam · nama · pemeriksaan."),
                ("Isian", "Temuan (uraian) dan Kesan (kesimpulan). Bukan angka lab."),
                ("Cetak", "Lembar hasil USG / radiologi. Tautan pasien tetap terkunci jika hutang."),
            ]
        ),
        say_box(
            "“Bagian USG tidak perlu melihat antrian darah. Yang muncul hanya pasien ultrasonografi hari ini, lengkap dengan jam panggil.”"
        ),
        PageBreak(),
    ]

    # 8 stok
    story += [
        Paragraph("8. Stok persediaan per cabang", S["H1"]),
        Paragraph(
            "Halaman pertama adalah dasbor kontrol, bukan daftar panjang. Angka yang ditampilkan: sisa awal − dikirim − pakai = sisa.",
            S["Body"],
        ),
        head_table(
            ["Tab", "Isi"],
            [
                ["Kontrol", "Habis, menipis, aman — dikelompokkan per cabang. Tanpa label berulang “menipis di…”."],
                ["Kebutuhan cabang", "Usulan kirim sampai minimum. Tombol kirim dari gudang Serang."],
                ["Stok cabang", "Naik-turun qty. Box/pak/rak/vial punya isi: 1 box = 100 pcs."],
                ["Tambah barang", "Nama, kelompok, satuan, minimum, isi per box jika perlu."],
                ["Distribusi", "Serang ke cabang lain."],
                ["Grafik", "Sisa per cabang, pemakaian 14 hari, distribusi keluar Serang."],
            ],
            [44 * mm, 130 * mm],
        ),
        say_box("“Gudang pusat di Serang. Cabang lain minta, Serang kirim. Pemilik lihat yang menipis tanpa buka Excel.”"),
        PageBreak(),
    ]

    # 9 keuangan
    story += [
        Paragraph("9. Keuangan", S["H1"]),
        Paragraph(
            "Uang masuk bukan total tagihan, melainkan uang yang benar-benar diterima: pembayaran kasir plus pelunasan hutang. Tagihan belum lunas masuk piutang, bukan laba.",
            S["Body"],
        ),
        kv_table(
            [
                ("Uang masuk", "Kasir + pelunasan, dipecah metode (tunai, QRIS, debit, asuransi, perusahaan)."),
                ("Hutang / piutang", "Daftar pasien belum lunas. Hasil mereka terkunci."),
                ("Pengeluaran", "Gaji, sewa, listrik, reagen, APD, limbah B3, kalibrasi, distribusi, ATK. Bisa dicatat manual per cabang."),
                ("Laba / rugi", "Uang masuk − pengeluaran, per cabang dan rentang tanggal."),
            ]
        ),
        say_box(
            "“Kalau pasien hutang, omzet belum dihitung penuh. Yang masuk kas itu yang sudah dibayar. Sisa menunggu pelunasan saat ambil hasil.”"
        ),
        PageBreak(),
    ]

    # 10 barcode
    story += [
        Paragraph("10. Barcode hasil & keaslian", S["H1"]),
        kv_table(
            [
                ("Struk kasir", "QR + barcode berisi tautan /hasil/{kode}."),
                ("Belum selesai isi", "Halaman: hasil masih diproses."),
                ("Belum lunas", "Halaman: belum lunas, sisa tagihan, lunasi di loket. Angka hasil tidak ditampilkan."),
                ("Lunas + selesai", "Tabel hasil (lab) atau kesan (setelah dipublikasikan)."),
                ("Lembar hasil", "Barcode /validasi/{kode} + kode sah. Cek surat palsu."),
            ]
        ),
        Paragraph(
            "Skrip penutup yang kuat: pindai struk saat masih hutang (terkunci) → lunasi di pasien lama → pindai lagi (hasil terbuka). Satu gerakan membuktikan kasir, hutang, lab, dan keamanan data.",
            S["Body"],
        ),
        PageBreak(),
    ]

    # cheat sheet
    story += [
        Paragraph("11. Lembar hapalan presenter", S["H1"]),
        head_table(
            ["Item", "Isi"],
            [
                ["Sandi FO", "bio1234"],
                ["WA pusat", "0811 1234 988"],
                ["PJ", "Dr. T.K. Darmawan, Sp.PK"],
                ["Badan hukum", "PT. Biomed Husada"],
                ["Berdiri", "1991"],
                ["NIB", "8120012160143"],
                ["Cabang", "Serang (pusat gudang), Cilegon, Cikupa, Pandeglang, Rangkasbitung"],
                ["Gudang", "Distribusi selalu dari Serang"],
                ["Hutang", "DP kasir → lunasi di pasien lama → baru buka /hasil"],
                ["EDTA", "Stiker: barcode + nama + umur + nomor lab"],
            ],
            [40 * mm, 134 * mm],
        ),
        Paragraph("Kalimat yang dihindari", S["H2"]),
        *bullets(
            [
                "Jangan bilang “booking online bayar di web” — reservasi lewat WhatsApp, bayar di kasir.",
                "Jangan pamer logo akreditasi karangan. Hanya lencana dan scan yang ada di web resmi.",
                "Jangan buka keuangan sebelum ada transaksi demo; grafik kosong melemahkan cerita.",
                "Jangan sebut sandi sebagai sandi produksi. Katakan akan diganti.",
            ]
        ),
        Paragraph("Jika ada yang bertanya teknis", S["H2"]),
        *bullets(
            [
                "PWA: dipasang di semua perangkat, jalan dari ikon, cocok antrian HP.",
                "Data kasir tersimpan di perangkat loket; hasil publik ikut diterbitkan agar tautan bisa dibuka.",
                "Harga cabang dari pricelist masing-masing, bukan satu daftar nasional.",
            ]
        ),
        Spacer(1, 8 * mm),
        Paragraph("12. Penutup yang rapi", S["H1"]),
        say_box(
            "“Dari HP pasien sampai tabung EDTA, dari gudang Serang sampai laba cabang — satu sistem. Yang belum lunas tidak bisa melihat hasil. Itu disiplin klinik, bukan hanya fitur.”"
        ),
        Spacer(1, 6 * mm),
        Paragraph("Selesai demo: tutup FO, kembali ke beranda, diamkan logo beberapa detik. Tawarkan tanya-jawab: legalitas, cabang, atau alur hutang.", S["Body"]),
        Paragraph("© 2026 PT. Biomed Husada · Laboratorium BIOMED · Internal", S["CenterMuted"]),
    ]

    doc.build(story)
    from shutil import copyfile

    copyfile(OUT, "/workspace/artifacts/manual-biomed.pdf")
    copyfile(OUT, "/workspace/manual-biomed.pdf")
    print(OUT)


if __name__ == "__main__":
    build()
