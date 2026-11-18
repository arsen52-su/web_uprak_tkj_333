const SUPABASE_URL = 'sb_publishable_5pSzOYAaoF9HSV11SRQiAw_Ex_ZXwaV';
const SUPABASE_KEY = 'https://ulxojddabvpnxuwezfvi.supabase.co';

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
      daftarPesan.innerHTML = '<p style="color:#475569;">Belum terhubung ke database Supabase.</p>';
      return;
    }

    if (data.length === 0) {
      daftarPesan.innerHTML = '<p style="color:#475569;">Belum ada pesan. Jadilah yang pertama mengisi!</p>';
      return;
    }

    daftarPesan.innerHTML = data.map(item => `
      <div class="message-item">
        <h4>${escapeHTML(item.nama)}</h4>
        <p>${escapeHTML(item.pesan)}</p>
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
