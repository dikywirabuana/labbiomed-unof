export const licenses = [
  {
    title: "Nomor Induk Berusaha (NIB)",
    issuer: "Pemerintah Republik Indonesia",
    number: "8120012160143",
    note: "Ditetapkan 7 September 2018.",
  },
  {
    title: "Surat Izin Laboratorium",
    issuer: "DPMPTSP Provinsi Banten",
    number: "81200121601430006",
    note: "Berlaku 30 Oktober 2022 s.d. 30 Oktober 2027.",
  },
  {
    title: "Surat Izin Klinik Utama",
    issuer: "DPMPTSP Kota Serang",
    number: "81200121601430005",
    note: "Berlaku 30 Juni 2022 s.d. 30 Juni 2027.",
  },
];

export const certifications = [
  "ISO 9001:2015 (transisi dari ISO 9001:2008 pada 2018; sistem mutu sejak 2007)",
  "Akreditasi lulus penuh Komisi Akreditasi Laboratorium Kesehatan (KALK) No. 81/S/KALK-P/IV/2017",
  "Sertifikasi Quality Control Pusat Laboratorium Kementerian Kesehatan RI",
  "HIPERKES dan Keselamatan Kerja, Kementerian Ketenagakerjaan RI",
  "SK Penunjukan Perusahaan Jasa K3 dan Dokter Pemeriksa Kesehatan Tenaga Kerja",
  "Izin operasional laboratorium dari Dinas Kesehatan setempat",
];

export const isoNote = [
  "Sejak 2007, BIOMED memperoleh predikat sebagai laboratorium yang telah mengimplementasikan sistem manajemen mutu mengacu standar internasional ISO 9001:2008.",
  "Selain sebagai bukti pengakuan eksternal, sertifikasi ISO 9001 tersebut menjadi daya dorong bagi BIOMED untuk terus meningkatkan kinerja pelayanan bagi pelanggan dan pemangku kepentingan.",
  "Pada tahun 2018 laboratorium BIOMED melakukan transisi audit menjadi ISO 9001:2015.",
];

export type LegalDoc = {
  src: string;
  title: string;
  note: string;
  group: string;
};

export const documents: LegalDoc[] = [
  {
    src: "/legalitas/nib.jpg",
    title: "Nomor Induk Berusaha",
    note: "NIB 8120012160143 · 7 September 2018",
    group: "Izin usaha",
  },
  {
    src: "/legalitas/izin-serang.jpg",
    title: "Izin Klinik Utama Serang",
    note: "503/KEP.102-DPMPTSP/2018 · DPMPTSP Kota Serang",
    group: "Izin usaha",
  },
  {
    src: "/legalitas/izin-cilegon.jpg",
    title: "Izin Klinik Pratama Cilegon",
    note: "503/Kep.239-DPMPTSP/2018 · DPMPTSP Kota Cilegon",
    group: "Izin usaha",
  },
  {
    src: "/legalitas/izin-cikupa.jpg",
    title: "Izin Klinik Pratama Cikupa",
    note: "503/Kep.1111/DPMPTSP/2018 · DPMPTSP Kabupaten Tangerang",
    group: "Izin usaha",
  },
  {
    src: "/legalitas/iso-2019-1.jpg",
    title: "ISO 9001:2015",
    note: "Sertifikat mutu 2019 — PT. Biomed Husada",
    group: "ISO",
  },
  {
    src: "/legalitas/iso-2019-2.jpg",
    title: "ISO 9001:2015 — ruang lingkup",
    note: "Lampiran cabang Serang, Cilegon, Cikupa, Pandeglang, Rangkasbitung",
    group: "ISO",
  },
  {
    src: "/legalitas/iso-2017-1.jpg",
    title: "ISO 9001:2008 (2017)",
    note: "Sertifikat Feb 2017 — PT. Biomed Husada",
    group: "ISO",
  },
  {
    src: "/legalitas/iso-2017-2.jpg",
    title: "ISO 9001:2008 (2015)",
    note: "Sertifikat mutu sebelumnya, sebelum transisi 2015",
    group: "ISO",
  },
  {
    src: "/legalitas/kalk.jpg",
    title: "Akreditasi KALK",
    note: "Komisi Akreditasi Laboratorium Kesehatan — lulus penuh 2017",
    group: "Akreditasi",
  },
  {
    src: "/legalitas/akreditasi-serang.jpg",
    title: "Akreditasi Kemenkes Serang",
    note: "Klinik Utama Laboratorium Biomed Serang — paripurna",
    group: "Akreditasi",
  },
  {
    src: "/legalitas/akreditasi-cilegon.jpg",
    title: "Akreditasi Kemenkes Cilegon",
    note: "Klinik Pratama Laboratorium Biomed Cilegon — paripurna",
    group: "Akreditasi",
  },
  {
    src: "/legalitas/sips.jpg",
    title: "SIP Spesialis Patologi Klinik",
    note: "Dr. T.K. Darmawan, Sp.PK — Dinkes Kota Serang",
    group: "Praktik & K3",
  },
  {
    src: "/legalitas/sk-k3.jpg",
    title: "SK Penunjukan PJK3",
    note: "Perusahaan Jasa Keselamatan dan Kesehatan Kerja — Kemnaker RI",
    group: "Praktik & K3",
  },
  {
    src: "/legalitas/penunjukan-dokter.jpg",
    title: "SK Dokter Pemeriksa Tenaga Kerja",
    note: "Penunjukan dokter pemeriksa kesehatan tenaga kerja — Kemnaker RI",
    group: "Praktik & K3",
  },
  {
    src: "/legalitas/ilo.jpg",
    title: "Sertifikat ILO radiologi",
    note: "International Labour Organization — pembacaan foto thorax ILO",
    group: "Praktik & K3",
  },
  {
    src: "/legalitas/serang.jpg",
    title: "Kendali mutu Serang 2015",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
  {
    src: "/legalitas/serang-1.jpg",
    title: "Kendali mutu Serang 2016",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
  {
    src: "/legalitas/serang-2.jpg",
    title: "Kendali mutu Serang 2017",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
  {
    src: "/legalitas/cilegon.jpg",
    title: "Kendali mutu Cilegon 2015",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
  {
    src: "/legalitas/cilegon-1.jpg",
    title: "Kendali mutu Cilegon 2016",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
  {
    src: "/legalitas/cilegon-2.jpg",
    title: "Kendali mutu Cilegon 2017",
    note: "Pusat Laboratorium Kesehatan Kementerian Kesehatan RI",
    group: "Kendali mutu",
  },
];
