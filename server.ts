
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Helper to get redirect URI
  const getRedirectUri = (provider: string) => {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    return `${baseUrl}/auth/${provider}/callback`;
  };

  // --- Google OAuth ---
  app.get('/api/auth/google/url', (req, res) => {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      redirect_uri: getRedirectUri('google'),
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
      access_type: 'offline',
      prompt: 'consent',
    });
    res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  });

  app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: getRedirectUri('google'),
        grant_type: 'authorization_code',
      });
      
      // In a real app, store tokens in a database associated with the user
      console.log('Google Tokens:', response.data);

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', provider: 'google' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Google Calendar connected successfully! Closing...</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Google Auth Error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  // --- Microsoft OAuth ---
  app.get('/api/auth/microsoft/url', (req, res) => {
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID || '',
      redirect_uri: getRedirectUri('microsoft'),
      response_type: 'code',
      scope: 'offline_access Calendars.ReadWrite',
      response_mode: 'query',
    });
    res.json({ url: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}` });
  });

  app.get('/auth/microsoft/callback', async (req, res) => {
    const { code } = req.query;
    try {
      const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', 
        new URLSearchParams({
          client_id: process.env.MICROSOFT_CLIENT_ID || '',
          client_secret: process.env.MICROSOFT_CLIENT_SECRET || '',
          code: code as string,
          redirect_uri: getRedirectUri('microsoft'),
          grant_type: 'authorization_code',
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      console.log('Microsoft Tokens:', response.data);

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', provider: 'microsoft' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Outlook Calendar connected successfully! Closing...</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Microsoft Auth Error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
