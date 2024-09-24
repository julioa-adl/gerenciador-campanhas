import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'Meu App',
  description: 'Dashboard com Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ClientLayout>
          {children}
        </ClientLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
