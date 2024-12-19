import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

async function createAdminAccount() {
  const timestamp = Date.now();
  const email = `admin${timestamp}@example.com`;
  const password = `admin${timestamp}`;

  try {
    // Create admin user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Set up admin user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('Admin account created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\nPlease save these credentials securely.');
    
    // Exit the process
    process.exit(0);
  } catch (error: any) {
    console.error('Error creating admin account:', error.message);
    process.exit(1);
  }
}

// Run the script
createAdminAccount();