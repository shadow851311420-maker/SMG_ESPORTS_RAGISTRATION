const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'shadow851311420@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'SMG ESPORTS <onboarding@resend.dev>';

app.post('/api/register', async (req, res) => {
  try {
    const { team, captain, uid1, phone, uid2, uid3, uid4 } = req.body || {};
    if (![team, captain, uid1, phone, uid2, uid3, uid4].every(v => typeof v === 'string' && v.trim())) {
      return res.status(400).json({ ok: false, message: 'Please fill all registration fields.' });
    }

    const safe = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const html = `
      <h2>SMG ESPORTS — New FF Squad Registration</h2>
      <p><b>Team Name:</b> ${safe(team)}</p>
      <p><b>Captain Name:</b> ${safe(captain)}</p>
      <p><b>Captain UID:</b> ${safe(uid1)}</p>
      <p><b>WhatsApp:</b> ${safe(phone)}</p>
      <p><b>Player 2 UID:</b> ${safe(uid2)}</p>
      <p><b>Player 3 UID:</b> ${safe(uid3)}</p>
      <p><b>Player 4 UID:</b> ${safe(uid4)}</p>
      <hr><p>Entry: ₹120 / squad • Max teams: 60</p>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `SMG ESPORTS Registration — ${team}`,
      html
    });

    if (error) return res.status(502).json({ ok: false, message: 'Email could not be sent.', detail: error.message || String(error) });
    res.json({ ok: true, message: 'Registration submitted successfully.' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error.' });
  }
});

app.listen(PORT, () => console.log(`SMG ESPORTS server running on port ${PORT}`));
