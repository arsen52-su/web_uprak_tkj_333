// GANTI DENGAN URL DAN ANON KEY DARI SUPABASE KAMU
const SUPABASE_URL = 'sb_publishable_5pSzOYAaoF9HSV11SRQiAw_Ex_ZXwaV';
const SUPABASE_KEY = 'https://ulxojddabvpnxuwezfvi.supabase.co';

// Cek apakah library supabase termuat
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'MASUKKAN_PROJECT_URL_SUPABASE_KAMU') {
  const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const form = document.getElementById('guestbook-form');
  const daftarPesan = document.getElementById('daftar-pesan');

  async function muatPesan() {
    if (!daftarPesan) return;
    const { data, error } = await db
      .from('buku_tamu')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      daftarPesan.innerHTML = '<p style="color:#94a3b8;">Belum terhubung ke database Supabase.</p>';
      return;
    }

    if (data.length === 0) {
      daftarPesan.innerHTML = '<p style="color:#94a3b8;">Belum ada pesan. Jadilah yang pertama mengisi!</p>';
      return;
    }

    daftarPesan.innerHTML = data.map(item => `
      <div class="message-item" style="background:#0f172a; padding:12px; border-radius:6px; margin-bottom:10px; border-left:3px solid #38bdf8;">
        <h4 style="color:#38bdf8; margin-bottom:4px;">${escapeHTML(item.nama)}</h4>
        <p style="color:#cbd5e1; font-size:0.95rem;">${escapeHTML(item.pesan)}</p>
      </div>
    `).join('');
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nama = document.getElementById('nama').value;
      const pesan = document.getElementById('pesan').value;

      const { error } = await db
        .from('buku_tamu')
        .insert([{ nama, pesan }]);

      if (error) {
        alert('Gagal mengirim pesan. Pastikan tabel Supabase sudah dibuat!');
      } else {
        form.reset();
        muatPesan();
      }
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag]));
  }

  muatPesan();
}
