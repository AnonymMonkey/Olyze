import express from 'express';
import bodyParser from 'body-parser';
import Sentiment from 'sentiment';

const app = express();
const sentiment = new Sentiment();

app.use(bodyParser.json());

app.post('/api/sentiment', (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Kein Text gesendet' });
    }

    const result = sentiment.analyze(text);
    res.json({
      sentiment: result.score >= 0 ? 'POSITIV' : 'NEGATIV',
      score: result.score,
    });
  } catch (err) {
    console.error('Fehler bei /api/sentiment:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend läuft auf Port ${PORT}`));
