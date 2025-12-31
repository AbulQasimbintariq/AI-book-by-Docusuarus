import React from 'react';
import { useLocation } from '@docusaurus/router';
import ChatBot from '@site/src/components/ChatBot';

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const location = useLocation();

    // Show chatbot on all pages
    return (
        <>
        { children }
        < ChatBot />
        </>
    );
};

export default RootLayout;
