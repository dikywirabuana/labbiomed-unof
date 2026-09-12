export type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  wa?: string;
  email?: string;
  photo?: string;
  note?: string;
};

export const WA_PUSAT = "628111234988";

export const branches: Branch[] = [
  {
    id: "serang",
    name: "BIOMED Serang",
    city: "Kota Serang",
    address: "Jl. Jend. Ahmad Yani No. 59, Cimuncang, Kota Serang, Banten 42117",
    phone: "(0254) 220304",
    wa: WA_PUSAT,
    email: "serang@biomedhusada.com",
    photo: "/cabang/serang.png",
  },
  {
    id: "cilegon",
    name: "BIOMED Cilegon",
    city: "Kota Cilegon",
    address: "Jl. Raya Cilegon No. 130, Sukmajaya, Kec. Jombang, Kota Cilegon, Banten 42423",
    phone: "(0254) 394489",
    wa: WA_PUSAT,
    email: "Cilegon@biomedhusada.com",
    photo: "/cabang/cilegon.png",
  },
  {
    id: "cikupa",
    name: "BIOMED Cikupa",
    city: "Tangerang",
    address: "Cikupa, Kabupaten Tangerang",
    phone: "0811 1234 988",
    wa: WA_PUSAT,
    note: "Alamat lengkap dikonfirmasi ke admin saat booking.",
  },
  {
    id: "pandeglang",
    name: "BIOMED Pandeglang",
    city: "Pandeglang",
    address: "Kabupaten Pandeglang, Banten",
    phone: "0811 1234 988",
    wa: WA_PUSAT,
    note: "Alamat lengkap dikonfirmasi ke admin saat booking.",
  },
  {
    id: "rangkas",
    name: "BIOMED Rangkasbitung",
    city: "Lebak",
    address: "Rangkasbitung, Kabupaten Lebak, Banten",
    phone: "0811 1234 988",
    wa: WA_PUSAT,
    note: "Alamat lengkap dikonfirmasi ke admin saat booking.",
  },
];

export function waLink(text: string) {
  return `https://wa.me/${WA_PUSAT}?text=${encodeURIComponent(text)}`;
}
