// pages/api/create-user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import supabaseAdmin from '@/lib/supabase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, full_name, role, phone, address, profession } = req.body;

  try {
    // 1. Create auth user
    const { data: user, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !user?.user?.id) {
      return res.status(400).json({ error: authError?.message || 'User creation failed' });
    }

    // 2. Insert profile
    const { error: dbError } = await supabaseAdmin.from('profiles').insert({
      id: user.user.id,
      email,
      full_name,
      role,
      phone,
      address,
      profession,
      is_active: true,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    return res.status(200).json({ message: 'User created successfully' });
  } catch (err: any) {
    console.error('[create-user error]', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
}
