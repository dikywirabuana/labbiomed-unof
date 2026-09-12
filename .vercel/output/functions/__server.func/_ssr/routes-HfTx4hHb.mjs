import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Stethoscope, f as HeartPulse, h as ArrowRight, p as FlaskConical, s as Scan } from "../_libs/lucide-react.mjs";
import { c as formatRupiah, h as branches } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-HfTx4hHb.js
var import_jsx_runtime = require_jsx_runtime();
var tests = [
	{
		id: "darah-lengkap",
		name: "Darah Lengkap",
		category: "Hematologi",
		price: 95e3,
		popular: true
	},
	{
		id: "darah-rutin-cito",
		name: "Darah Rutin Cito",
		category: "Hematologi",
		price: 95e3
	},
	{
		id: "hb",
		name: "Haemoglobin",
		category: "Hematologi",
		price: 5e4
	},
	{
		id: "led",
		name: "LED",
		category: "Hematologi",
		price: 5e4
	},
	{
		id: "golongan-darah",
		name: "Golongan Darah + Rhesus",
		category: "Hematologi",
		price: 6e4,
		popular: true
	},
	{
		id: "malaria",
		name: "Malaria",
		category: "Hematologi",
		price: 1e5
	},
	{
		id: "malaria-ag",
		name: "Malaria Antigen",
		category: "Hematologi",
		price: 2e5
	},
	{
		id: "pt",
		name: "Masa Protrombin (PT)",
		category: "Hematologi",
		price: 2e5
	},
	{
		id: "aptt",
		name: "APTT",
		category: "Hematologi",
		price: 2e5
	},
	{
		id: "d-dimer",
		name: "D-Dimer",
		category: "Hematologi",
		price: 35e4
	},
	{
		id: "ferritin",
		name: "Ferritin (ECLIA)",
		category: "Hematologi",
		price: 3e5
	},
	{
		id: "vit-b12",
		name: "Vitamin B12 (CLIA)",
		category: "Hematologi",
		price: 5e5
	},
	{
		id: "g6pd",
		name: "G6PD",
		category: "Hematologi",
		price: 5e5
	},
	{
		id: "glukosa-sewaktu",
		name: "Glukosa Sewaktu",
		category: "Diabetes",
		price: 4e4,
		popular: true
	},
	{
		id: "glukosa-puasa",
		name: "Glukosa Puasa",
		category: "Diabetes",
		price: 4e4,
		popular: true
	},
	{
		id: "glukosa-2jpp",
		name: "Glukosa 2 jam PP",
		category: "Diabetes",
		price: 4e4
	},
	{
		id: "hba1c",
		name: "HbA1c",
		category: "Diabetes",
		price: 16e4,
		popular: true
	},
	{
		id: "gtt",
		name: "Tes Toleransi Glukosa (GTT)",
		category: "Diabetes",
		price: 2e5
	},
	{
		id: "insulin-puasa",
		name: "Insulin Puasa",
		category: "Diabetes",
		price: 4e5
	},
	{
		id: "c-peptide",
		name: "C-Peptide",
		category: "Diabetes",
		price: 5e5
	},
	{
		id: "protein-lengkap",
		name: "Protein Lengkap",
		category: "Fungsi Hati",
		price: 1e5
	},
	{
		id: "sgot",
		name: "SGOT",
		category: "Fungsi Hati",
		price: 5e4,
		popular: true
	},
	{
		id: "sgpt",
		name: "SGPT",
		category: "Fungsi Hati",
		price: 5e4,
		popular: true
	},
	{
		id: "bilirubin",
		name: "Bilirubin",
		category: "Fungsi Hati",
		price: 1e5
	},
	{
		id: "ggt",
		name: "Gamma GT",
		category: "Fungsi Hati",
		price: 6e4
	},
	{
		id: "alkali-fosfatase",
		name: "Alkali Fosfatase",
		category: "Fungsi Hati",
		price: 6e4
	},
	{
		id: "ureum",
		name: "Ureum",
		category: "Fungsi Ginjal",
		price: 5e4,
		popular: true
	},
	{
		id: "kreatinin",
		name: "Kreatinin",
		category: "Fungsi Ginjal",
		price: 5e4,
		popular: true
	},
	{
		id: "asam-urat",
		name: "Asam Urat",
		category: "Fungsi Ginjal",
		price: 5e4,
		popular: true
	},
	{
		id: "cystatin-c",
		name: "Cystatin C",
		category: "Fungsi Ginjal",
		price: 4e5
	},
	{
		id: "lemak-lengkap",
		name: "Lemak Lengkap",
		category: "Lemak Darah",
		price: 2e5,
		popular: true
	},
	{
		id: "chol-total",
		name: "Cholesterol Total",
		category: "Lemak Darah",
		price: 5e4
	},
	{
		id: "trigliserida",
		name: "Trigliserida",
		category: "Lemak Darah",
		price: 5e4
	},
	{
		id: "hdl",
		name: "Cholesterol HDL",
		category: "Lemak Darah",
		price: 55e3
	},
	{
		id: "ldl",
		name: "Cholesterol LDL (direk)",
		category: "Lemak Darah",
		price: 6e4
	},
	{
		id: "natrium",
		name: "Natrium",
		category: "Elektrolit",
		price: 7e4
	},
	{
		id: "kalium",
		name: "Kalium",
		category: "Elektrolit",
		price: 8e4
	},
	{
		id: "chlorida",
		name: "Chlorida",
		category: "Elektrolit",
		price: 7e4
	},
	{
		id: "paket-elektrolit",
		name: "Paket Elektrolit",
		category: "Elektrolit",
		price: 18e4,
		popular: true
	},
	{
		id: "kalsium",
		name: "Calcium",
		category: "Elektrolit",
		price: 1e5
	},
	{
		id: "magnesium",
		name: "Magnesium",
		category: "Elektrolit",
		price: 1e5
	},
	{
		id: "ck-mb",
		name: "CK-MB",
		category: "Jantung",
		price: 2e5
	},
	{
		id: "troponin-i",
		name: "Troponin I",
		category: "Jantung",
		price: 35e4,
		popular: true
	},
	{
		id: "nt-probnp",
		name: "NT-ProBNP",
		category: "Jantung",
		price: 7e5
	},
	{
		id: "hscrp",
		name: "hsCRP",
		category: "Jantung",
		price: 2e5
	},
	{
		id: "urine-lengkap",
		name: "Urine Lengkap",
		category: "Urinalisa",
		price: 7e4,
		popular: true
	},
	{
		id: "tes-hamil",
		name: "Tes Kehamilan Rapid",
		category: "Urinalisa",
		price: 6e4
	},
	{
		id: "acr",
		name: "ACR (Albumin-Creatinine Ratio)",
		category: "Urinalisa",
		price: 25e4
	},
	{
		id: "narkoba-3",
		name: "Narkoba 3 Parameter",
		category: "Urinalisa",
		price: 15e4,
		popular: true
	},
	{
		id: "narkoba-6",
		name: "Narkoba 6 Parameter",
		category: "Urinalisa",
		price: 3e5
	},
	{
		id: "hbsag",
		name: "HBsAg (ECLIA)",
		category: "Imunoserologi",
		price: 15e4,
		popular: true
	},
	{
		id: "anti-hbs",
		name: "Anti HBs",
		category: "Imunoserologi",
		price: 18e4
	},
	{
		id: "anti-hcv",
		name: "Anti HCV",
		category: "Imunoserologi",
		price: 35e4
	},
	{
		id: "hiv",
		name: "HIV Antigen/Antibodi (ECLIA)",
		category: "Imunoserologi",
		price: 2e5,
		popular: true
	},
	{
		id: "widal",
		name: "Widal",
		category: "Imunoserologi",
		price: 9e4
	},
	{
		id: "dengue",
		name: "Dengue IgG/IgM",
		category: "Imunoserologi",
		price: 18e4,
		popular: true
	},
	{
		id: "dengue-ns1",
		name: "Dengue Antigen NS1",
		category: "Imunoserologi",
		price: 18e4
	},
	{
		id: "vdrl",
		name: "VDRL",
		category: "Imunoserologi",
		price: 8e4
	},
	{
		id: "tpha",
		name: "TPHA",
		category: "Imunoserologi",
		price: 15e4
	},
	{
		id: "crp",
		name: "CRP",
		category: "Imunoserologi",
		price: 15e4
	},
	{
		id: "rf",
		name: "Rheumatoid Factor",
		category: "Imunoserologi",
		price: 15e4
	},
	{
		id: "vit-d",
		name: "Vitamin D 25-OH",
		category: "Hormon",
		price: 35e4,
		popular: true
	},
	{
		id: "tsh",
		name: "TSHs",
		category: "Hormon",
		price: 22e4,
		popular: true
	},
	{
		id: "ft4",
		name: "Free T4",
		category: "Hormon",
		price: 25e4
	},
	{
		id: "ft3",
		name: "Free T3",
		category: "Hormon",
		price: 3e5
	},
	{
		id: "fsh",
		name: "FSH",
		category: "Hormon",
		price: 35e4
	},
	{
		id: "lh",
		name: "LH",
		category: "Hormon",
		price: 35e4
	},
	{
		id: "estradiol",
		name: "Estradiol",
		category: "Hormon",
		price: 35e4
	},
	{
		id: "prolaktin",
		name: "Prolaktin",
		category: "Hormon",
		price: 35e4
	},
	{
		id: "testosteron",
		name: "Testosteron",
		category: "Hormon",
		price: 35e4
	},
	{
		id: "amh",
		name: "AMH (Anti Mullerian Hormone)",
		category: "Hormon",
		price: 8e5
	},
	{
		id: "beta-hcg",
		name: "Beta hCG Kuantitatif",
		category: "Hormon",
		price: 4e5
	},
	{
		id: "cortisol",
		name: "Cortisol",
		category: "Hormon",
		price: 4e5
	},
	{
		id: "afp",
		name: "AFP",
		category: "Tumor Marker",
		price: 35e4
	},
	{
		id: "cea",
		name: "CEA",
		category: "Tumor Marker",
		price: 4e5
	},
	{
		id: "psa",
		name: "PSA",
		category: "Tumor Marker",
		price: 35e4
	},
	{
		id: "ca125",
		name: "CA 125",
		category: "Tumor Marker",
		price: 4e5
	},
	{
		id: "ca153",
		name: "CA 15-3",
		category: "Tumor Marker",
		price: 4e5
	},
	{
		id: "ca199",
		name: "CA 19-9",
		category: "Tumor Marker",
		price: 75e4
	},
	{
		id: "usg-abdomen",
		name: "USG Abdomen Lengkap",
		category: "USG",
		price: 45e4,
		popular: true
	},
	{
		id: "usg-atas",
		name: "USG Abdomen Atas",
		category: "USG",
		price: 4e5
	},
	{
		id: "usg-bawah",
		name: "USG Abdomen Bawah",
		category: "USG",
		price: 4e5
	},
	{
		id: "usg-kandungan",
		name: "USG Kandungan",
		category: "USG",
		price: 35e4,
		popular: true
	},
	{
		id: "usg-mamae",
		name: "USG Mamae",
		category: "USG",
		price: 5e5
	},
	{
		id: "usg-tiroid",
		name: "USG Tiroid",
		category: "USG",
		price: 4e5
	},
	{
		id: "echo",
		name: "Echocardiografi",
		category: "USG",
		price: 7e5
	},
	{
		id: "ro-thorax",
		name: "Rontgen Thorax PA",
		category: "Rontgen",
		price: 18e4,
		popular: true
	},
	{
		id: "ro-thorax-lat",
		name: "Rontgen Thorax PA + LAT",
		category: "Rontgen",
		price: 28e4
	},
	{
		id: "ro-lumbal",
		name: "Rontgen Lumbal AP + LAT",
		category: "Rontgen",
		price: 35e4
	},
	{
		id: "ekg",
		name: "EKG",
		category: "Penunjang",
		price: 1e5,
		popular: true
	},
	{
		id: "spirometri",
		name: "Spirometri",
		category: "Penunjang",
		price: 1e5
	},
	{
		id: "audiometri",
		name: "Audiometri",
		category: "Penunjang",
		price: 1e5
	},
	{
		id: "treadmill",
		name: "Treadmill Test",
		category: "Penunjang",
		price: 55e4
	},
	{
		id: "mmpi",
		name: "MMPI",
		category: "Penunjang",
		price: 35e4
	},
	{
		id: "home-service",
		name: "Home Service",
		category: "Penunjang",
		price: 5e4
	},
	{
		id: "pap-smear",
		name: "Pap Smear",
		category: "Penunjang",
		price: 37e4
	},
	{
		id: "analisa-sperma",
		name: "Analisa Sperma",
		category: "Penunjang",
		price: 17e4
	},
	{
		id: "kultur-urine",
		name: "Kultur Urine",
		category: "Mikrobiologi",
		price: 5e5
	},
	{
		id: "kultur-darah",
		name: "Kultur Darah",
		category: "Mikrobiologi",
		price: 5e5
	},
	{
		id: "bta",
		name: "BTA Sputum",
		category: "Mikrobiologi",
		price: 8e4
	},
	{
		id: "hpv-dna",
		name: "HPV DNA Screening (PCR)",
		category: "Biomolekuler",
		price: 9e5
	},
	{
		id: "hbv-dna",
		name: "HBV DNA Kuantitatif (PCR)",
		category: "Biomolekuler",
		price: 12e5
	},
	{
		id: "nipt",
		name: "NIPT",
		category: "Biomolekuler",
		price: 5e6
	}
];
var services = [
	{
		icon: FlaskConical,
		title: "Laboratorium klinik",
		body: "Hematologi, kimia, hormon, imunoserologi, dan biomolekuler."
	},
	{
		icon: Scan,
		title: "USG & rontgen",
		body: "Abdomen, kandungan, mamae, thorax ILO, dan rontgen mobile."
	},
	{
		icon: HeartPulse,
		title: "Jantung & MCU",
		body: "EKG, echo, treadmill, spirometri, audiometri, MMPI."
	},
	{
		icon: Stethoscope,
		title: "Kesehatan kerja",
		body: "MCU karyawan on-site, radiologi ILO, dokter okupasi."
	}
];
function Home() {
	const popular = tests.filter((t) => t.popular).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
							children: "Biomed · sejak 1991"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl",
							children: ["Laboratorium klinik Biomed.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block italic text-blue",
								children: "Hasil akurat, tubuh terjaga."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-base leading-relaxed text-muted",
							children: "Laboratorium BIOMED — klinik utama & lab terakreditasi ISO 9001:2015 dan KALK. Lima cabang di Banten untuk pasien umum dan MCU industri."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/reservasi",
								className: "inline-flex h-12 items-center rounded-full bg-red px-6 text-sm font-semibold text-chalk",
								children: "Reservasi dari HP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/harga",
								className: "inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 text-sm font-semibold text-ink",
								children: "Cek daftar harga"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/legalitas",
							className: "mt-6 grid grid-cols-4 gap-2",
							children: [
								{
									src: "/lencana/iso.png",
									label: "ISO 9001"
								},
								{
									src: "/legalitas/kalk.jpg",
									label: "KALK"
								},
								{
									src: "/legalitas/akreditasi-serang.jpg",
									label: "Kemenkes"
								},
								{
									src: "/legalitas/ilo.jpg",
									label: "ILO"
								}
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "overflow-hidden rounded-xl border border-line bg-surface p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: m.src,
									alt: m.label,
									className: "mx-auto h-16 w-full object-contain object-top sm:h-20"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-center text-xs text-muted",
									children: m.label
								})]
							}, m.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-96 overflow-hidden rounded-xl bg-blue-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/hero-dokter.jpg",
						alt: "Dr. T.K. Darmawan, Sp.PK, pendiri Laboratorium BIOMED",
						className: "h-96 w-full object-cover object-top lg:absolute lg:inset-0 lg:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 bg-blue-deep/85 p-5 text-chalk backdrop-blur-sm sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-chalk/70",
								children: "Pendiri"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl leading-snug",
								children: "Dr. T.K. Darmawan, Sp.PK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-chalk/75",
								children: "Memimpin BIOMED sejak 1991 — lima cabang di Banten, ISO 9001:2015 dan akreditasi KALK."
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-red",
						children: "Sejarah"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-10 lg:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold leading-tight sm:text-4xl lg:col-span-5",
							children: "Tiga dekade hasil lab yang bisa dipercaya."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm leading-relaxed text-muted lg:col-span-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tahun 1991 Laboratorium BIOMED didirikan dan hingga kini dipimpin langsung oleh Dr. T.K. Darmawan, Sp.PK. Sejak awal kami melayani masyarakat umum sekaligus MCU karyawan dan calon karyawan di perusahaan Jabodetabek." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Apresiasi pasien dan mitra membawa cabang baru: Serang, Cilegon, Tangerang (Cikupa), Pandeglang, dan Rangkasbitung. Mutu dikunci lewat ISO 9001 (2007, transisi 2015 pada 2018) dan akreditasi penuh KALK, plus HIPERKES dan izin klinik utama." })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							["1991", "Berdiri di Serang, MCU industri dimulai."],
							["2007", "Sistem mutu ISO 9001 diterapkan."],
							["2018", "Transisi ISO 9001:2015 dan NIB resmi."],
							["Kini", "Lima cabang, lab + rontgen, USG, EKG."]
						].map(([year, note]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-ink",
								children: year
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: note
							})]
						}, year))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
					children: "Layanan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold sm:text-4xl",
					children: "Satu atap, alat lengkap"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/layanan",
					className: "hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex",
					children: ["Semua layanan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-6 text-red" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: s.body
						})
					]
				}, s.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
							children: "Tarif"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-semibold sm:text-4xl",
							children: "Pemeriksaan yang sering dicari"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Harga referensi Serang. Cabang lain di menu Harga."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/harga",
						className: "hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex",
						children: ["Semua harga ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 divide-y divide-line rounded-xl border border-line bg-paper",
					children: popular.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t.category
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tabular-nums",
							children: formatRupiah(t.price)
						})]
					}, t.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
					children: "Cabang"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold sm:text-4xl",
					children: "Lima kota di Banten"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cabang",
					className: "hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex",
					children: ["Semua cabang ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-xl border border-line bg-surface",
					children: [b.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: b.photo,
						alt: b.name,
						className: "h-40 w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-40 items-end bg-blue p-4 font-display text-3xl text-chalk/30",
						children: b.city
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: b.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: b.city
						})]
					})]
				}, b.id))
			})]
		})
	] });
}
//#endregion
export { Home as component };
