import bcrypt from 'bcryptjs';
import { User } from '../models/user';

export async function seedAdmin() {
  const adminEmail = 'admin@test.it';

  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log('Admin already present');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    email: adminEmail,
    ruoli: 'Amministratore',
    permessi: [
      'Account.Read',
      'Account.Write',
      'File.Read'
    ],
    password: hashedPassword,
  });

  console.log('Admin created successfully');
}
