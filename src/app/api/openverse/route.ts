import { NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const getRefreshToken = async () => {
  const clientId = process.env.OPENVERSE_CLIENT_ID;
  const clientSecret = process.env.OPENVERSE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Openverse credentials');
  }

  try {
    // First check if we have a valid token in the database
    const { data: tokenData } = await supabase
      .from('openverse_tokens')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (tokenData && tokenData.token) {
      return tokenData.token;
    }

    // If no token found or expired, generate new one
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    const response = await axios.post('https://api.openverse.org/v1/auth_tokens/token/', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const newToken = response.data.access_token;

    // Store the new token
    await supabase.from('openverse_tokens').insert([
      {
        token: newToken,
        created_at: new Date().toISOString(),
      },
    ]);

    return newToken;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    throw error;
  }
};

const getTokenFromSupabase = async () => {
  const { data: tokenData } = await supabase
    .from('openverse_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  return tokenData?.token;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page');
    const type = searchParams.get('type');

    if (!query || !page || !type) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const token = await getTokenFromSupabase();
    if (!token) {
      await getRefreshToken();
    }

    const response = await axios.get(`https://api.openverse.org/v1/${type}s/`, {
      params: {
        q: query,
        page: page,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    await getRefreshToken();
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: axios.isAxiosError(error) ? error.response?.status || 500 : 500 },
    );
  }
}
