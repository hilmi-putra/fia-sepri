export interface Couple {
  id: string;
  groom_name: string;
  bride_name: string;
  groom_description: string | null;
  bride_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  event_type: string;
  location: string | null;
  address: string | null;
  event_date: string | null;
  created_at: string;
}

export interface Rsvp {
  id: string;
  guest_name: string;
  attendance_status: string | null;
  total_guest: number;
  created_at: string;
}

export interface Wish {
  id: string;
  guest_name: string;
  message: string | null;
  created_at: string;
}

export interface Gallery {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface Setting {
  id: string;
  music_url: string | null;
  theme_color: string | null;
  created_at: string;
}

export interface GiftRecommendation {
  id: string;
  name: string;
  description: string | null;
  price: number;
  total_needed: number;
  total_bought: number;
  image_url: string | null;
  purchase_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftPurchase {
  id: string;
  gift_id: string;
  buyer_name: string;
  whatsapp_number: string;
  email: string | null;
  quantity: number;
  created_at: string;
}
