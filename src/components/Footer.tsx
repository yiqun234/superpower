import Link from 'next/link';
import React from 'react';
import SuperpowerLogo from './SuperpowerLogo'; // Assuming you have this component

const Footer = () => {
    const footerLinks = [
        {
            title: 'The Company',
            links: [
                { text: 'About', href: '#' },
                { text: 'Careers', href: '#' },
                { text: 'Press', href: '#' },
            ],
        },
        {
            title: 'The Science',
            links: [
                { text: 'Our Approach', href: '#' },
                { text: 'Advisors', href: '#' },
                { text: 'FAQ', href: '#' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { text: 'Privacy Policy', href: '#' },
                { text: 'Terms of Service', href: '#' },
            ],
        },
    ];

    const socialLinks = [
        { name: 'Twitter', href: '#', icon: 'T' },
        { name: 'Instagram', href: '#', icon: 'I' },
        { name: 'LinkedIn', href: '#', icon: 'L' },
    ]

    return (
        <footer className="bg-[#0b0b0b] text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <div className="w-36">
                            <SuperpowerLogo />
                        </div>
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-4 font-bold text-gray-400">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.text}>
                                        <Link href={link.href} className="text-gray-200 hover:text-white transition-colors">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Superpower, Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        {/* Replace with actual icons */}
                        {socialLinks.map(social => (
                             <a key={social.name} href={social.href} className="text-gray-400 hover:text-white transition-colors">
                                {social.name}
                             </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 